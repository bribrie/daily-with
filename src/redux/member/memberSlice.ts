import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  AddMemberReq,
  DeleteMemberReq,
  EditMemberReq,
  GetMemberReq,
  MemberState,
  MemeberListType,
} from "redux/types";
import { db, storage } from "service/firebase";
import { RootState } from "redux/store";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export const CHECK_IMAGE_WORD = "Image does not exist";

export const getMemberAsync = createAsyncThunk(
  "member/get",
  async (getData: GetMemberReq, { rejectWithValue }) => {
    try {
      if (getData.userUid) {
        const collectionRef = collection(
          db,
          "users",
          getData.userUid,
          "member"
        );

        const querySnapshot = await getDocs(collectionRef);
        let data: MemeberListType[] = [];

        //firestore에서 정보 가져오기
        querySnapshot.forEach((doc) => {
          const { name, contact, introduction, role, workDay, image } =
            doc.data();
          data.push({
            id: doc.id,
            name,
            contact,
            introduction,
            role,
            workDay,
            image: image,
          });
        });

        //storage에서 이미지 파일 가져오기
        for (let el of data) {
          if (el.image !== CHECK_IMAGE_WORD) {
            const imageStorageRef = ref(storage, el.name);
            const result = await getDownloadURL(imageStorageRef);
            el.image = result;
          }
        }

        return { data };
      }
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

export const addMemberAsync = createAsyncThunk(
  "member/add",
  async (addData: AddMemberReq, { rejectWithValue }) => {
    try {
      if (addData.userUid) {
        const collectionRef = collection(
          db,
          "users",
          addData.userUid,
          "member"
        );

        //등록할 이미지가 있을 때
        if (addData.image) {
          const response = await addDoc(collectionRef, {
            name: addData.name,
            contact: addData.contact,
            introduction: addData.introduction,
            role: addData.role,
            workDay: addData.workDay,
            image: "Image file upload",
          });

          //storage에 이미지 파일 추가, 이름은 name으로 설정하여 구분함
          if (response) {
            const storageRef = ref(storage, addData.name);
            const result = await uploadBytes(storageRef, addData.image as File);
            if (result) return;
          }
        } else {
          //등록할 이미지가 없을 때
          await addDoc(collectionRef, {
            name: addData.name,
            contact: addData.contact,
            introduction: addData.introduction,
            role: addData.role,
            workDay: addData.workDay,
            image: CHECK_IMAGE_WORD,
          });
        }
        return { message: "success" };
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const editMemberAsync = createAsyncThunk(
  "member/edit",
  async (editData: EditMemberReq, { rejectWithValue }) => {
    try {
      if (editData.userUid) {
        const docRef = doc(
          collection(db, "users", editData.userUid, "member"),
          editData.id
        );
        if (editData.image) {
          await updateDoc(docRef, {
            name: editData.name,
            contact: editData.contact,
            introduction: editData.introduction,
            role: editData.role,
            workDay: editData.workDay,
            image: "Image file upload",
          });

          const storageRef = ref(storage, editData.name);
          const result = await uploadBytes(storageRef, editData.image as File);

          if (result) return;
        } else {
          await updateDoc(docRef, {
            name: editData.name,
            contact: editData.contact,
            introduction: editData.introduction,
            role: editData.role,
            workDay: editData.workDay,
            image: CHECK_IMAGE_WORD,
          });
        }
        return { message: "success" };
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteMemberAsync = createAsyncThunk(
  "member/delete",
  async (deleteData: DeleteMemberReq, { rejectWithValue }) => {
    try {
      if (deleteData.userUid) {
        const docRef = doc(
          db,
          "users",
          deleteData.userUid,
          "member",
          deleteData.id
        );

        //1. 이미지 있으면 이미지 파일 지우기
        if (deleteData.image !== CHECK_IMAGE_WORD) {
          const imageRef = ref(storage, deleteData.name);
          await deleteObject(imageRef);
        }

        //2. 데이터 지우기
        await deleteDoc(docRef);

        return { message: "success" };
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState: { memberList: [], loading: "idle" } as MemberState,
  reducers: {},
  extraReducers: (builder) => {
    //Get
    builder.addCase(getMemberAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getMemberAsync.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.memberList = action.payload.data;
        state.loading = "succeeded";
      }
    });
    builder.addCase(getMemberAsync.rejected, (state) => {
      state.loading = "failed";
    });
    //Add
    builder.addCase(addMemberAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addMemberAsync.fulfilled, (state, action) => {
      if (action.payload?.message) {
        state.loading = "succeeded";
      }
    });
    builder.addCase(addMemberAsync.rejected, (state) => {
      state.loading = "failed";
    });
    //Update
    builder.addCase(editMemberAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(editMemberAsync.fulfilled, (state, action) => {
      if (action.payload?.message) {
        state.loading = "succeeded";
      }
    });
    builder.addCase(editMemberAsync.rejected, (state) => {
      state.loading = "failed";
    });
    //Delete
    builder.addCase(deleteMemberAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(deleteMemberAsync.fulfilled, (state, action) => {
      if (action.payload?.message) {
        state.loading = "succeeded";
      }
    });
    builder.addCase(deleteMemberAsync.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const memberList = (state: RootState) =>
  state.persistedReducer.member.memberList;

export const memberLoading = (state: RootState) =>
  state.persistedReducer.member.loading;

export default memberSlice.reducer;
