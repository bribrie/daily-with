import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

interface timeState {
  time: number | string;
}

const timeTaskSlice = createSlice({
  name: "timeTask",
  initialState: {
    time: "",
  } as timeState,
  reducers: {
    changeTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { changeTime } = timeTaskSlice.actions;

export const time = (state: RootState) => state.persistedReducer.timeTask.time;

export default timeTaskSlice.reducer;
