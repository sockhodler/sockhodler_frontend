import { ErrorModel } from './ErrorModel';
import { HTTPStatusCodes } from 'common/enums/HTTPStatusCodes';

export interface DTOModel<T> {
  data: T | null;
  error: ErrorModel | null;
  totalCount?: number;
  status: HTTPStatusCodes | null;
}
