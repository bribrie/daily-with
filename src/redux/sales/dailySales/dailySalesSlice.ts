import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { INPUT_TODAY_FORMAT } from "utilites/Date";
import { SalesState } from "../salesTypes";
import {
  addSalesAsync,
  deleteSalesAsync,
  editSalesAsync,
  getAllSalesAsync,
  getOneMonthSalesAsync,
} from "./dailySalesThunk";

const dailySalesSlice = createSlice({
  name: "dailySales",
  initialState: {
    oneMonthSalesList: [],
    allSalesList: [],
    addSalesItemList: [],
    loading: "idle",
  } as SalesState,

  reducers: {
    addSalesData: (state, action) => {
      state.addSalesItemList.push(action.payload);
    },
    deleteSalesData: (state, action) => {
      state.addSalesItemList = state.addSalesItemList.filter((el) => {
        return el.id !== action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneMonthSalesAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getOneMonthSalesAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.loading = "succeeded";
        state.oneMonthSalesList = action.payload.data;
        state.addSalesItemList = [];
      }
    });
    builder.addCase(getOneMonthSalesAsync.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(getAllSalesAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllSalesAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.loading = "succeeded";
        state.allSalesList = action.payload.data;
        state.addSalesItemList = [];
      }
    });
    builder.addCase(getAllSalesAsync.rejected, (state, action) => {
      state.loading = "failed";
    });
    builder.addCase(addSalesAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addSalesAsync.fulfilled, (state) => {
      state.loading = "succeeded";
      state.addSalesItemList = [];
    });
    builder.addCase(addSalesAsync.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(editSalesAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(editSalesAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(editSalesAsync.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(deleteSalesAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(deleteSalesAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(deleteSalesAsync.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const salesLoading = (state: RootState) =>
  state.persistedReducer.sales.loading;

export const oneMonthSalesList = (state: RootState) =>
  state.persistedReducer.sales.oneMonthSalesList;

export const allSalesList = (state: RootState) =>
  state.persistedReducer.sales.allSalesList;

export const addSalesItemList = (state: RootState) =>
  state.persistedReducer.sales.addSalesItemList;

export const todaySalesList = createSelector(oneMonthSalesList, (list) =>
  list.filter((item) => item.date === INPUT_TODAY_FORMAT)
);

export const { addSalesData, deleteSalesData } = dailySalesSlice.actions;

export default dailySalesSlice.reducer;
