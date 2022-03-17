export interface VerifyUserParams {
  email: string;
  code: string;
}

export interface VerifyUserPayload {
  code?: string;
}
