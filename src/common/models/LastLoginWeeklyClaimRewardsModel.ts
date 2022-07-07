export interface GetLastLoginWeeklyClaimRewardsParams {
  username: string;
  fromAddress: string;
  toAddress: string;
  index: number;
}

export interface SetLastLoginWeeklyClaimRewardsParams {
  username: string;
  fromAddress: string;
  toAddress: string;
  index: number;
  date: string;
}
