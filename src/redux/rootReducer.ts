import { combineReducers } from "@reduxjs/toolkit";
import { walletReducer } from "./wallet/wallet-slice";
import { tagsReducer } from "./tags/tags-slice";
import { emailReducer } from "./email/email-slice";

const reducers = {
  wallets: walletReducer,
  tags: tagsReducer,
  email: emailReducer,
};

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
