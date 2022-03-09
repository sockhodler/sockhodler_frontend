import { RootState } from "redux/rootReducer";
import { ErrorModel } from "./ErrorModel";

export interface AsyncThunkOptions {
  state: RootState;
  rejectWithValue: ErrorModel;
}
