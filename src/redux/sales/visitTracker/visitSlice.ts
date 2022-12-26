import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { VisitState } from "../salesTypes";
import {
  addVisitDataAsync,
  deleteVisitDataAsync,
  editVisitDataAsync,
  getAllVisitDataAsync,
  getOneMonthVisitDataAsync,
} from "./visitThunk";

const visitSlice = createSlice({
  name: "visit",
  initialState: {
    oneMonthVisitList: [],
    allVisitList: [],
    loading: "idle",
  } as VisitState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneMonthVisitDataAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getOneMonthVisitDataAsync.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.loading = "succeeded";
        state.oneMonthVisitList = action.payload?.data;
      }
    });
    builder.addCase(getOneMonthVisitDataAsync.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(getAllVisitDataAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllVisitDataAsync.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.loading = "succeeded";
        state.allVisitList = action.payload?.data;
      }
    });
    builder.addCase(getAllVisitDataAsync.rejected, (state) => {
      state.loading = "failed";
    });

    builder.addCase(addVisitDataAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addVisitDataAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(addVisitDataAsync.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(editVisitDataAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(editVisitDataAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(editVisitDataAsync.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(deleteVisitDataAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(deleteVisitDataAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(deleteVisitDataAsync.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const visitLoading = (state: RootState) =>
  state.persistedReducer.visit.loading;

export const oneMonthVisitList = (state: RootState) =>
  state.persistedReducer.visit.oneMonthVisitList;

export const allVisitList = (state: RootState) =>
  state.persistedReducer.visit.allVisitList;

export default visitSlice.reducer;
