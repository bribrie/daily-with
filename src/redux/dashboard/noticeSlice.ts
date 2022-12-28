import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { RootState } from "redux/store";
import {
  AddNoticeReq,
  DeleteNoticeReq,
  GetNoticeReq,
  NoticeListType,
  NoticeState,
  UpdateNoticeReq,
} from "redux/types";
import { db } from "service/firebase";

export const getNoticeAsync = createAsyncThunk(
  "notice/get",
  async (getData: GetNoticeReq, { rejectWithValue }) => {
    try {
      if (getData.userUid) {
        const collectionRef = collection(
          db,
          "users",
          getData.userUid,
          "notice"
        );
        const q = query(collectionRef, orderBy("orderNumber", "asc"));
        const querySnapshot = await getDocs(q);

        let data: NoticeListType[] = [];

        //firestore에서 정보 가져오기
        querySnapshot.forEach((doc) => {
          const { content, orderNumber } = doc.data();
          data.push({
            id: doc.id,
            content,
            orderNumber,
          });
        });
        return { data };
      }
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

export const addNoticeAsync = createAsyncThunk(
  "notice/add",
  async (addData: AddNoticeReq, { rejectWithValue }) => {
    try {
      if (addData.userUid) {
        const collectionRef = collection(
          db,
          "users",
          addData.userUid,
          "notice"
        );
        await addDoc(collectionRef, {
          content: addData.content,
          orderNumber: addData.orderNumber,
        });
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateOrderNumberAsync = createAsyncThunk(
  "notice/update",
  async (updateData: UpdateNoticeReq, { rejectWithValue }) => {
    try {
      if (updateData.userUid) {
        const ref = doc(
          db,
          "users",
          updateData.userUid,
          "notice",
          updateData.id
        );
        updateDoc(ref, {
          orderNumber: updateData.orderNumber,
        });
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteNoticeAsync = createAsyncThunk(
  "notice/delete",
  async (deleteData: DeleteNoticeReq, { rejectWithValue }) => {
    try {
      if (deleteData.userUid) {
        const docRef = doc(
          db,
          "users",
          deleteData.userUid,
          "notice",
          deleteData.id
        );
        await deleteDoc(docRef);
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const noticeSlice = createSlice({
  name: "notice",
  initialState: {
    noticeList: [],
    loading: "idle",
  } as NoticeState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNoticeAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getNoticeAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.noticeList = action.payload.data;
        state.loading = "succeeded";
      }
    });
    builder.addCase(getNoticeAsync.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(addNoticeAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addNoticeAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(addNoticeAsync.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(deleteNoticeAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(deleteNoticeAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(deleteNoticeAsync.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const noticeList = (state: RootState) =>
  state.persistedReducer.notice.noticeList;

export const noticeLoading = (state: RootState) =>
  state.persistedReducer.notice.loading;

export default noticeSlice.reducer;
