import { Middleware } from "@reduxjs/toolkit";
import { ErrorModel } from "common/models/ErrorModel";
import { RootState } from "../rootReducer";
import { ThunkAppDispatch } from "../store";
import {
  asyncCheckUser,
  setIsNew,
  setLoginSuccess,
  setModalStep,
} from "./wallet-slice";

export const walletMiddleware: Middleware<void, RootState, ThunkAppDispatch> =
  (middlewareOptions) => (next) => async (action) => {
    const { dispatch, getState } = middlewareOptions;
    const result = next(action);

    if (asyncCheckUser.fulfilled.match(action)) {
      if (action.payload.data?.message) {
        dispatch(setIsNew(true));
        dispatch(setModalStep(2));
      } else if (action.payload.data?.email) {
        dispatch(setIsNew(false));
        dispatch(setLoginSuccess(true));
      }
    }

    return result;
  };
