import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  AddTargetReq,
  DeleteTargetReq,
  EditTargetReq,
  GetTargetReq,
  TargetListType,
} from "redux/types";
import { db } from "service/firebase";

//Target List
export const getTargetAsync = createAsyncThunk(
  "sales/target/get",
  async (getData: GetTargetReq) => {
    if (getData.userUid) {
      const ref = collection(db, "users", getData.userUid, "target");
      const querySnapshot = await getDocs(ref);

      let data: TargetListType[] = [];

      querySnapshot.forEach((doc) => {
        const { month, type, newTarget, reRegisterTarget, totalSales } =
          doc.data();
        data.push({
          month,
          type,
          newTarget,
          reRegisterTarget,
          totalSales,
          id: doc.id,
        });
      });
      //payload 전달
      return { data };
    }
  }
);

export const addTargetAsync = createAsyncThunk(
  "sales/target/add",
  async (addData: AddTargetReq, { rejectWithValue }) => {
    try {
      if (addData.userUid) {
        const ref = collection(db, "users", addData.userUid, "target");
        //target콜렉션에 문서 id는 월로 해서 문서로 데이터 저장
        await addDoc(ref, {
          month: addData.month,
          type: addData.type,
          newTarget: addData.newTarget,
          reRegisterTarget: addData.reRegisterTarget,
          totalSales: addData.totalSales,
        });
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const editTargetAsync = createAsyncThunk(
  "sales/target/edit",
  async (editData: EditTargetReq, { rejectWithValue }) => {
    try {
      if (editData.userUid) {
        const ref = doc(
          collection(db, "users", editData.userUid, "target"),
          editData.id
        );
        await updateDoc(ref, {
          month: editData.month,
          type: editData.type,
          newTarget: editData.newTarget,
          reRegisterTarget: editData.reRegisterTarget,
          totalSales: editData.totalSales,
        });
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteTargetAsync = createAsyncThunk(
  "sales/target/delete",
  async (deleteData: DeleteTargetReq, { rejectWithValue }) => {
    try {
      if (deleteData.userUid) {
        const ref = doc(
          collection(db, "users", deleteData.userUid, "target"),
          deleteData.id
        );
        await deleteDoc(ref);
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
