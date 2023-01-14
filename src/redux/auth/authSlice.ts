import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  setDoc,
  doc,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db, provider } from "service/firebase";
import {
  AuthState,
  SignInReq,
  SignUpReq,
  UpdateUserNameReq,
  User,
} from "../types";
import { persistor, RootState } from "redux/store";
import { PURGE } from "redux-persist";

//가입할 때는 db collection에 추가하기
export const signUpAsync = createAsyncThunk(
  "auth/signup",
  async (signUpUser: SignUpReq, { rejectWithValue }) => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const res = await createUserWithEmailAndPassword(
        auth,
        signUpUser.email,
        signUpUser.password
      );

      await updateProfile(res.user, { displayName: signUpUser.centerName });

      const currentUser = {
        name: res.user.displayName,
        email: res.user.email,
        uid: res.user.uid,
      };

      //firestore에 현재 유저의 uid로 doc추가
      await setDoc(doc(db, "users", currentUser.uid), {
        name: currentUser.name,
        email: currentUser.email,
      });

      //payload로 전달
      return { name: currentUser.name, uid: currentUser.uid };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const signInAsync = createAsyncThunk(
  "auth/signin",
  async (signInUser: SignInReq, { rejectWithValue }) => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const res = await signInWithEmailAndPassword(
        auth,
        signInUser.email,
        signInUser.password
      );

      const currentUser = {
        name: res.user.displayName,
        uid: res.user.uid,
      };
      return { name: currentUser.name, uid: currentUser.uid };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const signOutAsync = createAsyncThunk("auth/signout", async () => {
  await signOut(auth);
  await persistor.purge();
});

//구글 로그인
export const googleSignInAsync = createAsyncThunk("auth/google", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    //firestore에서 이메일 확인 후 없으면 현재 유저의 uid로 doc추가
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const snapshot = await getDocs(q);
    const len = snapshot.docs.length;

    //없을 때 추가
    if (len === 0) {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || "",
        email: user.email,
      });
      return { name: user.displayName, uid: user.uid };
    }
    //있을 때는 찾아서 state에 저장 -> 이름을 변경한 경우 displayName과 다를 수 있기 때문에 firestore에 저장된 이름으로 보여줌
    const firestoreUser: User = {
      name: "",
      uid: "",
    };
    snapshot.forEach((doc) => {
      const { name } = doc.data();
      firestoreUser.name = name;
      firestoreUser.uid = doc.id;
    });
    return firestoreUser;
  } catch (error: any) {
    return error.message;
  }
});

export const updateUserNameAsync = createAsyncThunk(
  "auth/updateUserName",
  async (data: UpdateUserNameReq, { rejectWithValue }) => {
    try {
      if (data.userUid) {
        const centerNameRef = doc(collection(db, "users"), data.userUid);
        await updateDoc(centerNameRef, {
          name: data.centerName,
        });
        return { name: data.centerName };
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState: AuthState = {
  user: {
    name: null,
    uid: null,
  },
  loading: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //SignUp
    builder.addCase(signUpAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(signUpAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(signUpAsync.rejected, (state) => {
      state.loading = "failed";
    });
    //SignIn
    builder.addCase(signInAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(signInAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(signInAsync.rejected, (state) => {
      state.loading = "failed";
    });
    //SingOut
    builder.addCase(PURGE, () => initialState);
    builder.addCase(signOutAsync.fulfilled, (state) => {
      state = initialState;
    });
    //Google SignIn
    builder.addCase(googleSignInAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(googleSignInAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.loading = "succeeded";
      }
    });
    builder.addCase(googleSignInAsync.rejected, (state) => {
      state.loading = "failed";
    });
    //UpdateUserName
    builder.addCase(updateUserNameAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(updateUserNameAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.user.name = action.payload?.name;
        state.loading = "succeeded";
      }
    });
    builder.addCase(updateUserNameAsync.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const currentUser = (state: RootState) =>
  state.persistedReducer.auth.user.name;

export const currentUserUid = (state: RootState) =>
  state.persistedReducer.auth.user.uid;

export const authLoading = (state: RootState) =>
  state.persistedReducer.auth.loading;

export default authSlice.reducer;
