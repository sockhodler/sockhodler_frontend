/*
 * File: case-slice.ts
 * Project: receiving-rules
 * -----
 * Last Modified: 30 Sep 2020 5:38:56 pm
 * -----
 * Copyright (c) 2020 Elegant Software Solutions All rights reserved.
 */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SessionWallet } from "algorand-session-wallet";
import { config } from "common/config/conf";
import { WalletService } from "services/WalletService";
import { AsyncThunkOptions } from "common/models/AsyncThunkOptions";
import { DTOModel } from "common/models/DTOModel";
import {
  CheckUserParams,
  CheckUserPayload,
} from "common/models/CheckUserModel";
import {
  RegisterUserPayload,
  RegisterUserParams,
} from "common/models/RegisterUserModel";
import {
  VerifyUserPayload,
  VerifyUserParams,
} from "common/models/VerifyUserModel";
import { ClearUserParams } from "common/models/ClearUserModel";

import { ErrorModel } from "common/models/ErrorModel";

/* ****************** Enums ****************** */
export enum WalletLoadingId {
  GET_CONNECT_WALLET = "getConnectWallet",
  CHECK_USER = "checkUser",
  REGISTER_USER = "registerUser",
  VERIFY_USER = "verifyUser",
}

export enum WalletErrorId {
  GET_CONNECT_WALLET = "getConnectWallet",
  CLEAR_USER = "clearUser",
  REVERIFY_USER = "reverifyUser",
}

/* ****************** Slice Interfaces ****************** */
interface WalletStateModel {
  error: ErrorModel[];
  loading: WalletLoadingId[];
  sessionWallet: SessionWallet;
  connected: boolean | undefined;
  accts: any[];
  selectedAccount: any;
  isNew: boolean;
  loginSuccess: boolean;
  modalStep: number;
  userInfo: RegisterUserPayload;
}

const sw = new SessionWallet(config.network ? config.network : "TestNet");

const localAddr = localStorage.getItem("selectedAccount");

/* ****************** Initial State ****************** */
const initialState: WalletStateModel = {
  error: [],
  loading: [],
  sessionWallet: sw,
  connected: sw?.connected(),
  accts: sw?.accountList(),
  selectedAccount: sw
    ? sw.accountList().length > 0
      ? localAddr || sw.accountList()[0]
      : ""
    : undefined,
  isNew: false,
  loginSuccess: false,
  modalStep: 0,
  userInfo: {},
};

/* ****************** Async Thunks ****************** */
export const asyncCheckUser = createAsyncThunk<
  DTOModel<CheckUserPayload>,
  CheckUserParams,
  AsyncThunkOptions
>("wallet/checkUser", async (params, thunkOptions) => {
  const { rejectWithValue, getState } = thunkOptions;
  const { wallets } = getState();
  const { publicAddress } = params;

  if (wallets === undefined) {
    const error: ErrorModel = {
      errorMessage: "Unable to find wallet",
      status: 404,
    };

    return rejectWithValue({
      ...error,
      ...{ errorId: WalletErrorId.GET_CONNECT_WALLET },
    });
  }

  const response = await WalletService.checkUser({
    publicAddress,
  });

  if (response.error !== null) {
    return rejectWithValue({
      ...response.error,
      ...{ errorId: WalletErrorId.GET_CONNECT_WALLET },
    });
  }
  if (response.data === null) {
    return rejectWithValue({
      errorMessage: "Failed to check user address.",
      errorId: WalletErrorId.GET_CONNECT_WALLET,
    } as ErrorModel);
  }

  return response;
});

export const asyncRegisterUser = createAsyncThunk<
  DTOModel<RegisterUserPayload>,
  RegisterUserParams,
  AsyncThunkOptions
>("wallet/registerUser", async (params, thunkOptions) => {
  const { rejectWithValue, getState } = thunkOptions;
  const { wallets } = getState();
  const { publicAddress, email, username } = params;
  localStorage.setItem("email", email);
  if (wallets === undefined) {
    const error: ErrorModel = {
      errorMessage: "Unable to find wallet",
      status: 404,
    };

    return rejectWithValue({
      ...error,
      ...{ errorId: WalletErrorId.GET_CONNECT_WALLET },
    });
  }

  const response = await WalletService.registerUser(params);

  if (response.error !== null) {
    return rejectWithValue({
      ...response.error,
      ...{ errorId: WalletErrorId.GET_CONNECT_WALLET },
    });
  }
  if (response.data === null) {
    return rejectWithValue({
      errorMessage: "Failed to check user address.",
      errorId: WalletErrorId.GET_CONNECT_WALLET,
    } as ErrorModel);
  }

  return response;
});

export const asyncReverifyUser = createAsyncThunk<
  DTOModel<RegisterUserPayload>,
  RegisterUserParams,
  AsyncThunkOptions
>("wallet/reverifyUser", async (params, thunkOptions) => {
  const { rejectWithValue, getState } = thunkOptions;
  const { wallets } = getState();
  const { publicAddress, email, username } = params;
  localStorage.setItem("email", email);
  if (wallets === undefined) {
    const error: ErrorModel = {
      errorMessage: "Unable to find wallet",
      status: 404,
    };

    return rejectWithValue({
      ...error,
      ...{ errorId: WalletErrorId.REVERIFY_USER },
    });
  }

  const response = await WalletService.reverifyUser(params);

  if (response.error !== null) {
    return rejectWithValue({
      ...response.error,
      ...{ errorId: WalletErrorId.REVERIFY_USER },
    });
  }
  if (response.data === null) {
    return rejectWithValue({
      errorMessage: "Failed to reverify user address.",
      errorId: WalletErrorId.REVERIFY_USER,
    } as ErrorModel);
  }

  return response;
});

export const asyncClearUser = createAsyncThunk<
  DTOModel<null>,
  ClearUserParams,
  AsyncThunkOptions
>("wallet/clearUser", async (params, thunkOptions) => {
  const { rejectWithValue, getState } = thunkOptions;
  const { wallets } = getState();
  const { publicAddress, email, username } = params;
  // if (wallets === undefined) {
  //   const error: ErrorModel = {
  //     errorMessage: "Unable to find wallet",
  //     status: 404,
  //   };

  //   return rejectWithValue({
  //     ...error,
  //     ...{ errorId: WalletErrorId.GET_CONNECT_WALLET },
  //   });
  // }

  const response = await WalletService.clearUser(params);

  if (response.error !== null) {
    return rejectWithValue({
      ...response.error,
      ...{ errorId: WalletErrorId.CLEAR_USER },
    });
  }
  if (response.data === null) {
    return rejectWithValue({
      errorMessage: "Failed to clear user address.",
      errorId: WalletErrorId.CLEAR_USER,
    } as ErrorModel);
  }

  return response;
});

export const asyncVerifyUser = createAsyncThunk<
  DTOModel<VerifyUserPayload>,
  VerifyUserParams,
  AsyncThunkOptions
>("wallet/verifyUser", async (params, thunkOptions) => {
  const { rejectWithValue, getState } = thunkOptions;
  const { wallets } = getState();
  const { code } = params;

  if (wallets === undefined) {
    const error: ErrorModel = {
      errorMessage: "Unable to find wallet",
      status: 404,
    };

    return rejectWithValue({
      ...error,
      ...{ errorId: WalletErrorId.GET_CONNECT_WALLET },
    });
  }

  const response = await WalletService.verifyUser(params);

  if (response.error !== null) {
    return rejectWithValue({
      ...response.error,
      ...{ errorId: WalletErrorId.GET_CONNECT_WALLET },
    });
  }
  if (response.data === null) {
    return rejectWithValue({
      errorMessage: "Failed to check user address.",
      errorId: WalletErrorId.GET_CONNECT_WALLET,
    } as ErrorModel);
  }

  return response;
});

/* ****************** Slice ****************** */
export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setSessionWallet(state, action) {
      state.sessionWallet = action.payload;
    },
    setAccounts(state, action) {
      state.accts = action.payload;
    },
    setConnectedStatus(state, action) {
      state.connected = action.payload;
    },
    setSelectedAccount(state, action) {
      localStorage.setItem("selectedAccount", action.payload);
      state.selectedAccount = action.payload;
    },
    setIsNew(state, action) {
      state.isNew = action.payload;
    },
    setLoginSuccess(state, action) {
      state.loginSuccess = action.payload;
    },
    setModalStep(state, action) {
      state.modalStep = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    // GET Get Connect Wallet
    builder.addCase(
      asyncCheckUser.fulfilled,
      (state, action: PayloadAction<DTOModel<CheckUserPayload>>) => {
        state.loading = state.loading.filter(
          (id) => id !== WalletLoadingId.CHECK_USER
        );
      }
    );
    builder.addCase(asyncCheckUser.pending, (state) => {
      state.loading.push(WalletLoadingId.CHECK_USER);
    });
    builder.addCase(asyncCheckUser.rejected, (state, action) => {
      state.loading = state.loading.filter(
        (id) => id !== WalletLoadingId.CHECK_USER
      );
      state.error.push(action.payload as ErrorModel);
    });

    builder.addCase(asyncRegisterUser.fulfilled, (state) => {
      state.loading = state.loading.filter(
        (id) => id !== WalletLoadingId.REGISTER_USER
      );
    });
    builder.addCase(asyncRegisterUser.pending, (state) => {
      state.loading.push(WalletLoadingId.REGISTER_USER);
    });
    builder.addCase(asyncRegisterUser.rejected, (state) => {
      localStorage.removeItem("email");
      state.loading = state.loading.filter(
        (id) => id !== WalletLoadingId.REGISTER_USER
      );
    });

    builder.addCase(asyncVerifyUser.fulfilled, (state) => {
      state.loading = state.loading.filter(
        (id) => id !== WalletLoadingId.VERIFY_USER
      );
    });
    builder.addCase(asyncVerifyUser.pending, (state) => {
      state.loading.push(WalletLoadingId.VERIFY_USER);
    });
    builder.addCase(asyncVerifyUser.rejected, (state, action) => {
      state.loading = state.loading.filter(
        (id) => id !== WalletLoadingId.VERIFY_USER
      );
      state.error.push(action.payload as ErrorModel);
    });
  },
});

export const {
  setSessionWallet,
  setAccounts,
  setConnectedStatus,
  setSelectedAccount,
  setIsNew,
  setLoginSuccess,
  setModalStep,
  setUserInfo,
} = walletSlice.actions;

export const walletReducer = walletSlice.reducer;
