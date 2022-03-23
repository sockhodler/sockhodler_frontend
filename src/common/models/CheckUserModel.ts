export interface CheckUserParams {
  publicAddress: string;
}

export interface CheckUserPayload {
  email?: string;
  username?: string;
  status: string;
  message?: string;
  verified?: boolean;
}
