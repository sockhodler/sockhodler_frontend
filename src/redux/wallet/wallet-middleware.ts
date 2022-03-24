import { Middleware } from "@reduxjs/toolkit";
import { ErrorModel } from "common/models/ErrorModel";
import { RootState } from "../rootReducer";
import { ThunkAppDispatch } from "../store";
import {
  asyncCheckUser,
  asyncRegisterUser,
  asyncVerifyUser,
  asyncReverifyUser,
  setIsNew,
  setLoginSuccess,
  setModalStep,
  setUserInfo,
} from "./wallet-slice";

export const walletMiddleware: Middleware<void, RootState, ThunkAppDispatch> =
  (middlewareOptions) => (next) => async (action) => {
    const { dispatch, getState } = middlewareOptions;
    const result = next(action);

    if (asyncCheckUser.fulfilled.match(action)) {
      if (action.payload.data?.status === "not found") {
        dispatch(setIsNew(true));
        dispatch(setModalStep(2));
      } else if (action.payload.data?.email) {
        if (action.payload.data?.verified === true) {
          dispatch(setIsNew(false));
          dispatch(setLoginSuccess(true));
          dispatch(setUserInfo(action.payload.data));
        }
      }
    }

    if (asyncRegisterUser.fulfilled.match(action)) {
      dispatch(setModalStep(3));
    }

    if (asyncReverifyUser.fulfilled.match(action)) {
      dispatch(setModalStep(3));
    }

    if (asyncVerifyUser.fulfilled.match(action)) {
      dispatch(setModalStep(4));
    }

    return result;
  };
