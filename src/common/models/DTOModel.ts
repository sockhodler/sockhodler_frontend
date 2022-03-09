import { HTTPStatusCodes } from "common/enums/HTTPStatusCodes";
import { ErrorModel } from "./ErrorModel";

export interface DTOModel<T> {
  data: T | null;
  error: ErrorModel | null;
  totalCount?: number;
  status: HTTPStatusCodes | null;
}
