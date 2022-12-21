import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    modalOpen: (state) => {
      state.isOpen = true;
    },
    modalClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { modalOpen, modalClose } = modalSlice.actions;

export const modalState = (state: RootState) => state.modal.isOpen;

export default modalSlice.reducer;
