export interface GetStakeRecordsParams {
  fromAddress: string;
}

export interface StakeRecordPayload {
  fromAddress: string;
  toAddress: string;
  index: number;
  amount: number;
}

export interface SetStakeRecordsParams {
  username: string;
  fromAddress: string;
  toAddress: string;
  index: number;
  amount: number;
}

export interface DeleteStakeRecordsParams {
  fromAddress: string;
  index: number;
  amount: number;
}
