import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db, provider } from "service/firebase";
import { AuthState, SignInReq, SignUpReq } from "../types";
import { persistor, RootState } from "redux/store";
import { PURGE } from "redux-persist";

const initialState: AuthState = {
  user: {
    name: null,
    uid: null,
  },
  loading: "idle",
};

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

export const SignInAsync = createAsyncThunk(
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
  await persistor.purge();
  await signOut(auth);
});

//구글 로그인
export const googleSignInAsync = createAsyncThunk("auth/google", async () => {
  const result = await signInWithPopup(auth, provider);
  try {
    const credential = GoogleAuthProvider.credentialFromResult(result);

    const token = credential?.accessToken;
    const user = result.user;
  } catch (error: any) {
    const credential = GoogleAuthProvider.credentialFromError(error);
    //TODO: 수정
    console.log("google err", credential);
  }
});

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
    builder.addCase(signUpAsync.rejected, (state, action) => {
      state.loading = "failed";
    });
    //SignIn
    builder.addCase(SignInAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(SignInAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(SignInAsync.rejected, (state, action) => {
      state.loading = "failed";
    });
    //SingOut
    builder.addCase(PURGE, () => initialState);
    builder.addCase(signOutAsync.fulfilled, (state) => {
      state = initialState;
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
