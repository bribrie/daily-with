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
import companyReducer from "./company/companySlice";
import noticeReducer from "./dashboard/noticeSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["sales", "company"],
};

//addSalesItemList는 세션에 저장안함 => 새로고침하면 없어지게
const blackListPersistConfig = {
  key: "addedList",
  storage: storage,
  blacklist: ["addSalesItemList", "addLinkList"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  price: priceReducer,
  task: taskReducer,
  member: memberReducer,
  sales: persistReducer(blackListPersistConfig, salesReducer),
  target: targetReducer,
  visit: visitReducer,
  company: persistReducer(blackListPersistConfig, companyReducer),
  notice: noticeReducer,
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
