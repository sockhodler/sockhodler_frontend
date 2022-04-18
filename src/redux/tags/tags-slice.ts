import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TagModel,
  ScanTagModel,
  GetTagsDataParams,
  ErrorModel,
  DTOModel,
  AsyncThunkOptions,
  AuthenticateTagPayload,
  AuthStatusModel,
} from "common/models";
import { TagsService } from "services/TagsService";

export enum TagsLoadingId {
  AUTHENTICATE_TAG = "authenticateTag",
  GET_TAGS_DATA = "getTagsData",
}

export enum TagsErrorId {
  AUTHENTICATE_TAG = "authenticateTag",
  GET_TAGS_DATA = "getTagsData",
}

interface TagsStateModel {
  error: ErrorModel[];
  loading: TagsLoadingId[];
  tags: TagModel[];
  authStatus: AuthStatusModel;
  authenticatedTag: AuthenticateTagPayload | null;
}

const initialState: TagsStateModel = {
  error: [],
  loading: [],
  tags: [],
  authStatus: {
    statusType: "scan",
    statusMessage: "",
  },
  authenticatedTag: {
    tag: null,
    scan: null,
  },
};

export const asyncAuthenticateData = createAsyncThunk<
  DTOModel<AuthenticateTagPayload>,
  GetTagsDataParams,
  AsyncThunkOptions
>("tag/authenticate", async (params, thunkOptions) => {
  const { rejectWithValue, getState } = thunkOptions;
  const { wallets } = getState();
  const { cid, tid, pl } = params;
  const post_data = {
    useragent: "useragent string goes here",
    ip_address: "111.111.111.111",
    url_payload: pl,
  };

  const response = await TagsService.authenticateTag(post_data);

  if (response.error !== null) {
    return rejectWithValue({
      ...response.error,
      ...{ errorId: TagsErrorId.AUTHENTICATE_TAG },
    });
  }
  if (response.data === null) {
    return rejectWithValue({
      errorMessage: "Failed to authenticate tag.",
      errorId: TagsErrorId.AUTHENTICATE_TAG,
    } as ErrorModel);
  }

  return response;
});

// export const asyncGetTagsData = createAsyncThunk<
//   DTOModel<TagModel[]>,
//   GetTagsDataParams,
//   AsyncThunkOptions
// >("wallet/registerUser", async (params, thunkOptions) => {
//   const { rejectWithValue, getState } = thunkOptions;
//   const { wallets } = getState();
//   const { cid, tid, pl } = params;
//   const post_data = {
//     useragent: "useragent string goes here",
//     ip_address: "111.111.111.111",
//     url_payload: pl,
//   };

//   const response = await TagsService.authenticateTag(post_data);

// })

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setAuthStatus(state, action) {
      state.authStatus.statusType = action.payload.type;
      state.authStatus.statusMessage = action.payload.message;
    },
    setAuthenticatedTag(state, action) {
      state.authenticatedTag = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncAuthenticateData.fulfilled, (state, action) => {
      state.loading = state.loading.filter(
        (id) => id !== TagsLoadingId.AUTHENTICATE_TAG
      );
      state.authenticatedTag = action.payload.data;
    });
    builder.addCase(asyncAuthenticateData.pending, (state) => {
      state.loading.push(TagsLoadingId.AUTHENTICATE_TAG);
    });
    builder.addCase(asyncAuthenticateData.rejected, (state, action) => {
      state.loading = state.loading.filter(
        (id) => id !== TagsLoadingId.AUTHENTICATE_TAG
      );
      state.error.push(action.payload as ErrorModel);
    });
  },
});

export const { setAuthStatus, setAuthenticatedTag } = tagsSlice.actions;

export const tagsReducer = tagsSlice.reducer;
