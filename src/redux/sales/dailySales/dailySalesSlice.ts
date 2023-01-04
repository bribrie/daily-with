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
    builder.addCase(getAllSalesAsync.rejected, (state) => {
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
  state.persistedReducer.sales.oneMonthSalesList || [];

export const allSalesList = (state: RootState) =>
  state.persistedReducer.sales.allSalesList;

export const addSalesItemList = (state: RootState) =>
  state.persistedReducer.sales.addSalesItemList;

export const todaySalesList = createSelector(oneMonthSalesList, (list) =>
  list.filter((item) => item.date === INPUT_TODAY_FORMAT)
);

export const thisMonthTotalSales = createSelector(oneMonthSalesList, (list) => {
  let todayTotalSalesList: number[] = [];
  list.forEach((el) => {
    const onlyNumberSales = el.totalSales.replace(/[^0-9]/g, "");
    todayTotalSalesList.push(Number(onlyNumberSales));
  });
  return todayTotalSalesList.reduce((acc, cur) => acc + cur, 0);
});

export const thisMonthHealthSales = createSelector(
  oneMonthSalesList,
  (list) => {
    const filtered = list.filter((el) => el.type === "헬스");
    return filtered;
  }
);

export const todaySalesCount = createSelector(todaySalesList, (list) => {
  const sum = list.reduce((acc, cur) => {
    return acc + cur.reRegister + cur.newRegister;
  }, 0);
  return sum;
});

export const totalNewCount = createSelector(thisMonthHealthSales, (item) => {
  const sum = item.reduce((acc, cur) => {
    return acc + cur.newRegister;
  }, 0);
  return sum;
});

export const totalReCount = createSelector(thisMonthHealthSales, (item) => {
  const sum = item.reduce((acc, cur) => {
    return acc + cur.reRegister;
  }, 0);
  return sum;
});

export const totalRegister = createSelector(
  totalNewCount,
  totalReCount,
  (newcount, reCount) => {
    return newcount + reCount;
  }
);

export const { addSalesData, deleteSalesData } = dailySalesSlice.actions;

export default dailySalesSlice.reducer;
