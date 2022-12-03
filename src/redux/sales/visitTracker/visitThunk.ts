import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  AddVisitReq,
  DeleteReq,
  EditVisitReq,
  GetReq,
  VisitListType,
} from "../salesTypes";
import { db } from "service/firebase";
import {
  VISIT_FILTER_MONTH_FINISH,
  VISIT_FILTER_MONTH_START,
} from "utilites/Date";

//한 달 데이터 or 전체 데이터 가져올 수 있음
export const getOneMonthVisitDataAsync = createAsyncThunk(
  "visit/oneMonth",
  async (getData: GetReq, { rejectWithValue }) => {
    try {
      if (getData.userUid) {
        const ref = collection(db, "users", getData.userUid, "visit");
        const q = query(
          ref,
          where("date", ">=", VISIT_FILTER_MONTH_START),
          where("date", "<=", VISIT_FILTER_MONTH_FINISH),
          orderBy("date", "desc"),
          orderBy("type", "desc")
        );

        const querySnapshot = await getDocs(q);

        let data: VisitListType[] = [];

        querySnapshot.forEach((doc) => {
          const {
            date,
            type,
            offline,
            online,
            friend,
            telIn,
            naverIn,
            kakaoIn,
            totalVisit,
            registerVisit,
          } = doc.data();

          data.push({
            id: doc.id,
            date,
            type,
            offline,
            online,
            friend,
            telIn,
            naverIn,
            kakaoIn,
            totalVisit,
            registerVisit,
          });
        });
        return { data };
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getAllVisitDataAsync = createAsyncThunk(
  "visit/all",
  async (getData: GetReq, { rejectWithValue }) => {
    try {
      if (getData.userUid) {
        const ref = collection(db, "users", getData.userUid, "visit");
        const q = query(ref, orderBy("date", "desc"), orderBy("type", "desc"));

        const querySnapshot = await getDocs(q);

        let data: VisitListType[] = [];

        querySnapshot.forEach((doc) => {
          const {
            date,
            type,
            offline,
            online,
            friend,
            telIn,
            naverIn,
            kakaoIn,
            totalVisit,
            registerVisit,
          } = doc.data();

          data.push({
            id: doc.id,
            date,
            type,
            offline,
            online,
            friend,
            telIn,
            naverIn,
            kakaoIn,
            totalVisit,
            registerVisit,
          });
        });
        return { data };
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const addVisitDataAsync = createAsyncThunk(
  "visit/add",
  async (addData: AddVisitReq, { rejectWithValue }) => {
    try {
      if (addData.userUid) {
        const ref = collection(db, "users", addData.userUid, "visit");

        await addDoc(ref, {
          date: addData.date,
          type: addData.type,
          offline: addData.offline,
          online: addData.online,
          friend: addData.friend,
          telIn: addData.telIn,
          naverIn: addData.naverIn,
          kakaoIn: addData.kakaoIn,
          totalVisit: addData.totalVisit,
          registerVisit: addData.registerVisit,
        });
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const editVisitDataAsync = createAsyncThunk(
  "visit/edit",
  async (editData: EditVisitReq, { rejectWithValue }) => {
    try {
      if (editData.userUid) {
        const ref = doc(
          collection(db, "users", editData.userUid, "visit"),
          editData.id
        );
        await updateDoc(ref, {
          date: editData.date,
          type: editData.type,
          offline: editData.offline,
          online: editData.online,
          friend: editData.friend,
          telIn: editData.telIn,
          naverIn: editData.naverIn,
          kakaoIn: editData.kakaoIn,
          totalVisit: editData.totalVisit,
          registerVisit: editData.registerVisit,
        });
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteVisitDataAsync = createAsyncThunk(
  "visit/delete",
  async (deleteData: DeleteReq, { rejectWithValue }) => {
    try {
      if (deleteData.userUid) {
        const ref = doc(
          collection(db, "users", deleteData.userUid, "visit"),
          deleteData.id
        );
        await deleteDoc(ref);
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
