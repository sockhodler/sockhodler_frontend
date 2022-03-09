import { combineReducers } from "@reduxjs/toolkit";
import { walletReducer } from "./wallet/wallet-slice";

const reducers = {
  wallets: walletReducer,
};

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
