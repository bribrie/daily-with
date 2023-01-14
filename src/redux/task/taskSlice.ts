import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { PURGE } from "redux-persist";
import { RootState } from "redux/store";
import {
  initialState,
  TaskListType,
  GetTaskReq,
  AddTaskReq,
  DeleletTaskReq,
  EditTaskReq,
} from "redux/types";
import { db } from "service/firebase";

export const getTaskAsync = createAsyncThunk(
  "task/get",
  async (getData: GetTaskReq) => {
    //컬렉션 모든 문서 가져오기, 정렬 추가
    if (getData.userUid !== null) {
      const ref = collection(db, "users", getData.userUid, "task");
      const q = query(ref, where("part", "==", getData.name), orderBy("time"));

      const querySnapshot = await getDocs(q);

      let data: TaskListType[] = [];

      querySnapshot.forEach((doc) => {
        const { part, title, detail, day, time, specialDate } = doc.data();
        data.push({
          id: doc.id,
          part: part,
          title: title,
          detail: detail,
          day: day,
          time: time,
          specialDate: specialDate,
        });
      });

      return { name: getData.name, data };
    }
  }
);

export const addTaskAsync = createAsyncThunk(
  "task/add",
  async (addData: AddTaskReq) => {
    //firestore로 보내기
    if (addData.userUid !== null) {
      const response = await addDoc(
        collection(db, "users", addData.userUid, "task"),
        {
          part: addData.part,
          title: addData.title,
          detail: addData.detail,
          day: addData.day,
          time: addData.time,
          specialDate: addData.specialDate,
        }
      );
      if (response) return;
    }
  }
);

export const editTaskAsync = createAsyncThunk(
  "task/update",
  async (editData: EditTaskReq, { rejectWithValue }) => {
    try {
      if (editData.userUid !== null) {
        const ref = doc(
          collection(db, "users", editData.userUid, "task"),
          editData.id
        );

        await updateDoc(ref, {
          part: editData.part,
          title: editData.title,
          detail: editData.detail,
          day: editData.day,
          time: editData.time,
          specialDate: editData.specialDate,
        });
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "task/delete",
  async (deleteData: DeleletTaskReq, { rejectWithValue }) => {
    try {
      if (deleteData.userUid && deleteData.id) {
        const ref = doc(
          collection(db, "users", deleteData.userUid, "task"),
          deleteData.id
        );
        await deleteDoc(ref);
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Get
    builder.addCase(getTaskAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getTaskAsync.fulfilled, (state, action) => {
      if (action.payload && action.payload.name !== undefined) {
        state.task[action.payload.name] = action.payload.data;
      }
      state.loading = "succeeded";
    });
    builder.addCase(getTaskAsync.rejected, (state) => {
      state.loading = "failed";
    });
    //Add
    builder.addCase(addTaskAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addTaskAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(addTaskAsync.rejected, (state) => {
      state.loading = "failed";
    });
    //Edit
    builder.addCase(editTaskAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(editTaskAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(editTaskAsync.rejected, (state) => {
      state.loading = "failed";
    });
    //Delete
    builder.addCase(deleteTaskAsync.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(deleteTaskAsync.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(deleteTaskAsync.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(PURGE, () => initialState);
  },
});

export const currentTask = (state: RootState) =>
  state.persistedReducer.task.task;

export const taskLoading = (state: RootState) =>
  state.persistedReducer.task.loading;

export const morningTask = createSelector(currentTask, (list) => {
  const task = list["daymorning"];
  if (task.length > 3) {
    return task.slice(0, 3);
  }
  return task;
});

export const afternoonTask = createSelector(currentTask, (list) => {
  const task = list["dayafternoon"];
  if (task.length > 3) {
    return task.slice(0, 3);
  }
  return task;
});

export const weekendTask = createSelector(currentTask, (list) => {
  const task = list["weekend"];
  if (task.length > 3) {
    return task.slice(0, 3);
  }
  return task;
});

export default taskSlice.reducer;
