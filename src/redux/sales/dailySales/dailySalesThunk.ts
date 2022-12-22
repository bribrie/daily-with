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
import { AddSalesReq, GetReq, SalesListType, DeleteReq } from "../salesTypes";
import { db } from "service/firebase";
import {
  SALES_FILTER_MONTH_FINISH,
  SALES_FILTER_MONTH_STRART,
} from "utilites/Date";

//Sales List
export const getAllSalesAsync = createAsyncThunk(
  "dailySales/all",
  async (getData: GetReq, { rejectWithValue }) => {
    try {
      if (getData.userUid) {
        const ref = collection(db, "users", getData.userUid, "sales");
        //date순으로 정렬
        const q = query(ref, orderBy("date", "desc"));

        const querySnapshot = await getDocs(q);
        let dataArray: SalesListType[] = [];

        querySnapshot.forEach((doc) => {
          let { data } = doc.data();
          for (let el of data) {
            el.id = doc.id;
          }
          dataArray = [...dataArray, ...data];
        });

        return { data: dataArray };
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getOneMonthSalesAsync = createAsyncThunk(
  "dailySales/oneMonth",
  async (getData: GetReq, { rejectWithValue }) => {
    try {
      if (getData.userUid) {
        const ref = collection(db, "users", getData.userUid, "sales");
        const q = query(
          ref,
          where("date", ">=", SALES_FILTER_MONTH_STRART),
          where("date", "<=", SALES_FILTER_MONTH_FINISH),
          orderBy("date", "desc")
        );

        const querySnapshot = await getDocs(q);

        let dataArray: SalesListType[] = [];

        querySnapshot.forEach((doc) => {
          let { data } = doc.data();
          for (let el of data) {
            el.id = doc.id;
          }
          dataArray = [...dataArray, ...data];
        });

        return { data: dataArray };
        //payload 전달
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const addSalesAsync = createAsyncThunk(
  "dailySales/add",
  async (addData: AddSalesReq, { rejectWithValue }) => {
    console.log("addData reducer", addData);
    try {
      if (addData.userUid && addData.date) {
        const ref = collection(db, "users", addData.userUid, "sales");

        await addDoc(ref, {
          date: addData.date,
          data: addData.data,
        });
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateSalesAsync = createAsyncThunk(
  "dailySales/update",
  async (updateData, { rejectWithValue }) => {}
);

export const deleteSalesAsync = createAsyncThunk(
  "dailySales/delete",
  async (deleteData: DeleteReq, { rejectWithValue }) => {
    try {
      if (deleteData.userUid) {
        const ref = doc(
          collection(db, "users", deleteData.userUid, "sales"),
          deleteData.id
        );
        await deleteDoc(ref);
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
