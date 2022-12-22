import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage/session"; //세션 스토리지
import logger from "redux-logger";
import authReducer from "./auth/authSlice";
import priceReducer from "./price/priceSlice";
import taskReducer from "./task/taskSlice";
import memberReducer from "./member/memberSlice";
import modalReducer from "./common/modalSlice";
import salesReducer from "./sales/dailySales/dailySalesSlice";
import targetReducer from "./sales/monthlyTarget/targetSlice";
import visitReducer from "./sales/visitTracker/visitSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["sales"],
};

//addSalesItemList는 세션에 저장안함 => 새로고침하면 없어지게
const salesPersistConfig = {
  key: "sales",
  storage: storage,
  blacklist: ["addSalesItemList"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  price: priceReducer,
  task: taskReducer,
  member: memberReducer,
  sales: persistReducer(salesPersistConfig, salesReducer),
  target: targetReducer,
  visit: visitReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger), //redux-logger 사용
});

export const persistor = persistStore(store);

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
