import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { RootState } from "redux/store";
import { PriceListType, PriceState, AddPriceReq } from "redux/types";
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
        data.push({ type, period, title, price, delay, event });
      });
      //payload 전달
      return { data };
    }
  }
);

export const addPriceAsync = createAsyncThunk(
  "price/add",
  async (priceData: AddPriceReq, { rejectWithValue }) => {
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
  },
});

export const priceList = (state: RootState) =>
  state.persistedReducer.price.priceList;

export const loading = (state: RootState) =>
  state.persistedReducer.price.loading;

export default priceSlice.reducer;
