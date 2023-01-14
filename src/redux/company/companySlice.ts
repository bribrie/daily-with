import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { PURGE } from "redux-persist";
import { RootState } from "redux/store";
import { AddCompanyReq, CompanyInitialState, GetReq } from "redux/types";
import { db } from "service/firebase";

export const getCompanyAsync = createAsyncThunk(
  "company/get",
  async (getData: GetReq, { rejectWithValue }) => {
    try {
      if (getData.userUid) {
        const collectionRef = collection(
          db,
          "users",
          getData.userUid,
          "company"
        );

        const querySnapshot = await getDocs(collectionRef);

        let dataArray: any[] = [];
        let timeData: any[] = [];
        let linkData: any[] = [];

        querySnapshot.forEach((doc) => {
          const { phoneNumber, location, timeInfo, linkInfo } = doc.data();
          dataArray.push({
            id: doc.id,
            phoneNumber,
            location,
          });
          timeData = [...timeData, ...timeInfo];
          linkData = [...linkData, ...linkInfo];
        });
        return { data: dataArray, timeData, linkData };
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const addCompanyAsync = createAsyncThunk(
  "company/add",
  async (addData: AddCompanyReq, { rejectWithValue }) => {
    try {
      if (addData.userUid) {
        const companyRef = collection(db, "users", addData.userUid, "company");

        await addDoc(companyRef, {
          phoneNumber: addData.phoneNumber,
          location: addData.location,
          timeInfo: addData.timeInfo,
          linkInfo: addData.linkInfo,
        });
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const editCompanyAsync = createAsyncThunk(
  "company/edit",
  async (editData: AddCompanyReq, { rejectWithValue }) => {
    try {
      if (editData.userUid && editData.id) {
        const companyRef = doc(
          collection(db, "users", editData.userUid, "company"),
          editData.id
        );

        await updateDoc(companyRef, {
          phoneNumber: editData.phoneNumber,
          location: editData.location,
          timeInfo: editData.timeInfo,
          linkInfo: editData.linkInfo,
        });
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState: CompanyInitialState = {
  information: [],
  timeInformation: [],
  linkInformation: [],
  addLinkList: [],
  loading: "idle",
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addLink: (state, action) => {
      state.addLinkList.push(action.payload);
    },
    deleteLink: (state, action) => {
      state.addLinkList = state.addLinkList.filter((el) => {
        return el.orderNumber !== action.payload;
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCompanyAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getCompanyAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.information = action.payload.data;
        state.timeInformation = action.payload.timeData;
        state.linkInformation = action.payload.linkData;
        state.loading = "succeeded";
      }
    });
    builder.addCase(getCompanyAsync.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(addCompanyAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addCompanyAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(addCompanyAsync.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(editCompanyAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(editCompanyAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(editCompanyAsync.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(PURGE, () => initialState);
  },
});

export const { addLink, deleteLink } = companySlice.actions;

export const addLinkList = (state: RootState) =>
  state.persistedReducer.company.addLinkList;

export const companyLoading = (state: RootState) =>
  state.persistedReducer.company.loading;

export const companyInfo = (state: RootState) =>
  state.persistedReducer.company.information;

export const companyTimeInfo = (state: RootState) =>
  state.persistedReducer.company.timeInformation;

export const companyLinkInfo = (state: RootState) =>
  state.persistedReducer.company.linkInformation;

export default companySlice.reducer;
