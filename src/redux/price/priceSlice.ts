import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { RootState } from "redux/store";
import {
  PriceListType,
  PriceState,
  AddPriceReq,
  EditPriceReq,
} from "redux/types";
import { db } from "service/firebase";

export const getPriceAsync = createAsyncThunk(
  "price/get",
  async (uid: string | null) => {
    if (uid !== null) {
      const ref = collection(db, "users", uid, "price");
      const querySnapshot = await getDocs(ref);

      let data: PriceListType[] = [];

      querySnapshot.forEach((doc) => {
        const { type, period, title, price, delay, event } = doc.data();
        data.push({ type, period, title, price, delay, event, id: doc.id });
      });
      //payload 전달
      return { data };
    }
  }
);

export const addPriceAsync = createAsyncThunk(
  "price/add",
  async (priceData: AddPriceReq, { rejectWithValue, signal }) => {
    try {
      if (priceData.userUid) {
        //price collection에 추가
        const ref = collection(db, "users", priceData.userUid, "price");
        const response = await addDoc(ref, {
          type: priceData.type,
          period: priceData.period,
          title: priceData.title,
          price: priceData.price,
          delay: priceData.delay,
          event: priceData.event,
        });

        if (response) return;
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const editPriceAsync = createAsyncThunk(
  "price/update",
  async (data: EditPriceReq, { rejectWithValue }) => {
    try {
      if (data.userUid !== null) {
        const ref = doc(
          collection(db, "users", data.userUid, "price"),
          data.id
        );

        await updateDoc(ref, {
          type: data.type,
          period: data.period,
          title: data.title,
          price: data.price,
          delay: data.delay,
        });
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

interface DeletePriceReq {
  userUid: string | null;
  id: string | undefined;
}

export const deletePriceAsync = createAsyncThunk(
  "price/delete",
  async (priceData: DeletePriceReq, { rejectWithValue }) => {
    try {
      console.log("slice", priceData);
      if (priceData.userUid && priceData.id) {
        const ref = doc(
          collection(db, "users", priceData.userUid, "price"),
          priceData.id
        );
        await deleteDoc(ref);
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const priceSlice = createSlice({
  name: "price",
  initialState: { priceList: [], loading: "idle" } as PriceState,
  reducers: {},
  extraReducers: (builder) => {
    //Get
    builder.addCase(getPriceAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getPriceAsync.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.loading = "succeeded";
        state.priceList = action.payload.data;
      }
    });
    builder.addCase(getPriceAsync.rejected, (state) => {
      state.loading = "failed";
    });
    //Add
    builder.addCase(addPriceAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addPriceAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(addPriceAsync.rejected, (state) => {
      state.loading = "failed";
    });
    //Update
    builder.addCase(editPriceAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(editPriceAsync.fulfilled, (state, action) => {
      state.loading = "succeeded";
    });
    builder.addCase(editPriceAsync.rejected, (state) => {
      state.loading = "failed";
    });
    //Delete
    builder.addCase(deletePriceAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(deletePriceAsync.fulfilled, (state, action) => {
      state.loading = "succeeded";
    });
    builder.addCase(deletePriceAsync.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const priceList = (state: RootState) =>
  state.persistedReducer.price.priceList;

export const priceLoading = (state: RootState) =>
  state.persistedReducer.price.loading;

export default priceSlice.reducer;
