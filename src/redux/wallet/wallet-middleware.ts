import { Middleware } from "@reduxjs/toolkit";
import { ErrorModel } from "common/models/ErrorModel";
import { RootState } from "../rootReducer";
import { ThunkAppDispatch } from "../store";

export const walletMiddleware: Middleware<void, RootState, ThunkAppDispatch> =
  (middlewareOptions) => (next) => async (action) => {
    const { dispatch, getState } = middlewareOptions;
    const result = next(action);

    // if (asyncCreateCustomerSourceFile.fulfilled.match(action)) {

    // }

    return result;
  };
