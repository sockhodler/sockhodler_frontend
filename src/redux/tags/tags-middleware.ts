/* eslint-disable no-case-declarations */
import { Middleware } from "@reduxjs/toolkit";
// import { ErrorModel } from "common/models/ErrorModel";
import { RootState } from "../rootReducer";
import { ThunkAppDispatch } from "../store";
import {
  asyncAuthenticateData,
  setAuthStatus,
  setAuthenticatedTag,
} from "./tags-slice";

export const tagsMiddleware: Middleware<void, RootState, ThunkAppDispatch> =
  (middlewareOptions) => (next) => async (action) => {
    const { dispatch } = middlewareOptions;
    const result = next(action);

    if (asyncAuthenticateData.fulfilled.match(action)) {
      const { data } = action.payload;
      if (data?.scan?.auth_stat) {
        switch (data.scan.auth_stat) {
          case 0:
            dispatch(
              setAuthStatus({
                type: "Error",
                message:
                  "There was a problem authenticating this tag. Please contact sockmaster@sockhodler.com for more information",
              })
            );
            break;
          case 1:
            dispatch(
              setAuthStatus({
                type: "Authenticated",
              })
            );
            dispatch(setAuthenticatedTag(data.tag));
            break;
          case 2:
            dispatch(
              setAuthStatus({
                type: "Authenticated and Sealed",
              })
            );
            dispatch(setAuthenticatedTag(data.tag));
            break;
          case 3:
            dispatch(
              setAuthStatus({
                type: "Authenticated and Unsealed",
              })
            );
            dispatch(setAuthenticatedTag(data.tag));
            break;
          case 4:
            dispatch(
              setAuthStatus({
                type: "Tag Not Active",
                message: "This tag is not currently active.",
              })
            );
            break;
          case 5:
            dispatch(
              setAuthStatus({
                type: "Tag Not Active",
                message: "This tag is not currently active.",
              })
            );
            break;
          case 6:
            dispatch(
              setAuthStatus({
                type: "Tag Not Active",
                message: "This tag is not currently active.",
              })
            );
            break;
          case 7:
            dispatch(
              setAuthStatus({
                type: "Authenticated", // Reconfigure after review
                message: "Please rescan tag.",
              })
            );
            break;
          case 8:
            dispatch(
              setAuthStatus({
                type: "Authentication Code Not Valid",
                message:
                  "This authentication code is not valid.  Please contact sockmaster@sockhodler.com for more information.",
              })
            );
            break;
          default:
            dispatch(
              setAuthStatus({
                type: "Error",
                message:
                  "There was a problem authenticating this tag. Please contact sockmaster@sockhodler.com for more information.",
              })
            );
            break;
        }
      }
    }

    return result;
  };
