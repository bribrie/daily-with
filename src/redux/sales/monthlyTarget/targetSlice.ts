import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { MONTHLY_TARGET_DATE } from "utilites/Date";
import { TargetState } from "../salesTypes";
import {
  addTargetAsync,
  deleteTargetAsync,
  editTargetAsync,
  getTargetAsync,
} from "./targetThunk";

const targetSlice = createSlice({
  name: "target",
  initialState: {
    targetList: [],
    loading: "idle",
  } as TargetState,
  reducers: {},
  extraReducers: (builder) => {
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

export const targetList = (state: RootState) =>
  state.persistedReducer.target.targetList;

export const targetLoading = (state: RootState) =>
  state.persistedReducer.target.loading;

export const healthTargetSales = createSelector(targetList, (list) => {
  const filteredData = list.filter(
    (el) => el.month === MONTHLY_TARGET_DATE && el.type === "헬스"
  )[0];
  if (filteredData) return filteredData.totalSales;
  return "0";
});

export default targetSlice.reducer;
