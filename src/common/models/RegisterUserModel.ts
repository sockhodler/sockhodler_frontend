export interface RegisterUserParams {
  email: string;
  username: string;
  publicAddress: string;
}

export interface RegisterUserPayload {
  email?: string;
  username?: string;
}
