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
import { AsyncThunkOptions } from "common/models/AsyncThunkOptions";
import { DTOModel } from "common/models/DTOModel";
import { ErrorModel } from "common/models/ErrorModel";

/* ****************** Enums ****************** */
export enum WalletLoadingId {
  GET_CONNECT_WALLET = "getConnectWallet",
}

export enum WalletErrorId {
  GET_CONNECT_WALLET = "getConnectWallet",
}

/* ****************** Slice Interfaces ****************** */
interface WalletStateModel {
  error: ErrorModel[];
  loading: WalletLoadingId[];
  sessionWallet: SessionWallet | undefined;
  connected: boolean | undefined;
  accts: any[] | undefined;
  selectedAccount: any;
}

interface GetConnectWalletParams {
  authToken: string;
  sourceFileId: string;
}

interface GetConnectWalletPayload {
  data: any;
}

let sw;
if (config.network) {
  sw = new SessionWallet(config.network);
}
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
};

/* ****************** Async Thunks ****************** */
// export const asyncGetConnectWallet = createAsyncThunk<GetConnectWalletPayload, GetConnectWalletParams, AsyncThunkOptions>('case/getCaseInfo', async (params, thunkOptions) => {
//     const { rejectWithValue, getState } = thunkOptions;
//     const { wallet } = getState();

//     if (wallet === undefined) {
//         const error: ErrorModel = {
//             errorMessage: 'Unable to find customer id',
//             status: 404
//         };

//         return rejectWithValue({ ...error, ...{ errorId: WalletErrorId.GET_CONNECT_WALLET } });
//     }

//     return {
//         data: {}
//     };
// });

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
  },
  extraReducers: (builder) => {
    // GET Get Connect Wallet
    // builder.addCase(asyncGetConnectWallet.fulfilled, (state, action: PayloadAction<GetConnectWalletPayload>) => {
    //     state.data = action.payload;
    //     state.loading = state.loading.filter((id) => id !== WalletLoadingId.GET_CONNECT_WALLET);
    // });
    // builder.addCase(asyncGetConnectWallet.pending, (state) => {
    //     state.loading.push(WalletLoadingId.GET_CONNECT_WALLET);
    // });
    // builder.addCase(asyncGetConnectWallet.rejected, (state, action) => {
    //     state.loading = state.loading.filter((id) => id !== WalletLoadingId.GET_CONNECT_WALLET);
    //     state.error.push(action.payload as ErrorModel);
    // });
  },
});

export const {
  setSessionWallet,
  setAccounts,
  setConnectedStatus,
  setSelectedAccount,
} = walletSlice.actions;

export const walletReducer = walletSlice.reducer;
