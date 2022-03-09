import {
  AnyAction,
  ThunkDispatch,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { middleware } from "./middleware";
import rootReducer, { RootState } from "./rootReducer";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [...customizedMiddleware, ...middleware],
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, AnyAction>;

export default store;
