import { TagModel, ScanTagModel } from "./TagModel";

export interface GetTagsDataParams {
  tid?: string;
  cid?: string;
  pl: string;
}

export interface AuthenticateTagParams {
  useragent: string;
  ip_address: string;
  url_payload: string;
}

export interface AuthenticateTagPayload {
  tag: TagModel | null;
  scan: ScanTagModel | null;
}

export interface AuthStatusModel {
  statusType: string;
  statusMessage: string | undefined;
}
