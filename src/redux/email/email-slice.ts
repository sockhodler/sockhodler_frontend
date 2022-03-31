import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncThunkOptions } from "common/models/AsyncThunkOptions";
import { DTOModel } from "common/models/DTOModel";
import { ErrorModel } from "common/models/ErrorModel";
import { SendEmailPayload, SendEmailParams } from "common/models/EmailModel";
import { EmailService } from "services/EmailService";

export enum EmailLoadingId {
  REDEEM_NFT_EMAIL = "redeemNFTEmail",
}

export enum EmailErrorId {
  REDEEM_NFT_EMAIL = "redeemNFTEmail",
}

interface EmailStateModel {
  loading: EmailLoadingId[];
  error: ErrorModel[];
}

const initialState: EmailStateModel = {
  error: [],
  loading: [],
};

export const asyncRedeemNFTSendEmail = createAsyncThunk<
  DTOModel<SendEmailPayload>,
  SendEmailParams,
  AsyncThunkOptions
>("email/redeemNFT", async (params, thunkOptions) => {
  const { rejectWithValue } = thunkOptions;

  const response = await EmailService.redeemNFTSendEmail(params);

  if (response.error !== null) {
    return rejectWithValue({
      ...response.error,
      ...{ errorId: EmailErrorId.REDEEM_NFT_EMAIL },
    });
  }
  if (response.data === null) {
    return rejectWithValue({
      errorMessage: "Failed to send email.",
      errorId: EmailErrorId.REDEEM_NFT_EMAIL,
    } as ErrorModel);
  }

  return response;
});

export const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncRedeemNFTSendEmail.fulfilled, (state) => {
      state.loading = state.loading.filter(
        (id) => id !== EmailLoadingId.REDEEM_NFT_EMAIL
      );
    });
    builder.addCase(asyncRedeemNFTSendEmail.pending, (state) => {
      state.loading.push(EmailLoadingId.REDEEM_NFT_EMAIL);
    });
    builder.addCase(asyncRedeemNFTSendEmail.rejected, (state, action) => {
      state.loading = state.loading.filter(
        (id) => id !== EmailLoadingId.REDEEM_NFT_EMAIL
      );
      state.error.push(action.payload as ErrorModel);
    });
  },
});

export const emailReducer = emailSlice.reducer;
