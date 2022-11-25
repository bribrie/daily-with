import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { SalesState } from "redux/types";
import {
  addTargetAsync,
  deleteTargetAsync,
  editTargetAsync,
  getTargetAsync,
} from "./salesThunk";

const salesSlice = createSlice({
  name: "sales",
  initialState: {
    salesList: [],
    targetList: [],
    loading: "idle",
  } as SalesState,
  reducers: {},
  extraReducers: (builder) => {
    //Sales List

    //Target List
    builder.addCase(getTargetAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getTargetAsync.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.loading = "succeeded";
        state.targetList = action.payload?.data;
      }
    });
    builder.addCase(getTargetAsync.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(addTargetAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addTargetAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(addTargetAsync.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(editTargetAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(editTargetAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(editTargetAsync.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(deleteTargetAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(deleteTargetAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(deleteTargetAsync.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const salesLoading = (state: RootState) =>
  state.persistedReducer.sales.loading;

export const salesList = (state: RootState) =>
  state.persistedReducer.sales.salesList;

export const targetList = (state: RootState) =>
  state.persistedReducer.sales.targetList;

export default salesSlice.reducer;
