import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    id: "",
  },
  reducers: {
    modalOpen: (state) => {
      state.isOpen = true;
    },
    modalClose: (state) => {
      state.isOpen = false;
    },
    modalSavedId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { modalOpen, modalClose, modalSavedId } = modalSlice.actions;

export const modalState = (state: RootState) => state.modal.isOpen;

export const modalId = (state: RootState) => state.modal.id;

export default modalSlice.reducer;
