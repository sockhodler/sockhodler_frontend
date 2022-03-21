import { combineReducers } from "@reduxjs/toolkit";
import { walletReducer } from "./wallet/wallet-slice";
import { tagsReducer } from "./tags/tags-slice";

const reducers = {
  wallets: walletReducer,
  tags: tagsReducer,
};

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
