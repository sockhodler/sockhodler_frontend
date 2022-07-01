import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { DTOModel } from "common/models/DTOModel";
import {
  CheckUserParams,
  CheckUserPayload,
} from "common/models/CheckUserModel";
import {
  RegisterUserPayload,
  RegisterUserParams,
} from "common/models/RegisterUserModel";
import {
  VerifyUserPayload,
  VerifyUserParams,
} from "common/models/VerifyUserModel";
import { SetLastLoginDailyScanRewardsParams } from "common/models/LastLoginDailyScanRewardsModel";
import {
  StakeRecordPayload,
  SetStakeRecordsParams,
  DeleteStakeRecordsParams,
} from "common/models/StakeRecordModel";
import { ClearUserParams } from "common/models/ClearUserModel";

const BaseAPI = process.env.REACT_APP_API_URL;

const checkUser = async (
  checkUserParams: CheckUserParams
): Promise<DTOModel<CheckUserPayload>> => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    url: `${BaseAPI}/auth/check`,
    data: checkUserParams,
  };

  const response: DTOModel<CheckUserPayload> = {
    data: null,
    error: null,
    status: null,
  };

  try {
    const resp: AxiosResponse<CheckUserPayload> = await axios(axiosOptions);

    response.data = resp.data;
    response.status = resp.status;
  } catch (err: any) {
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status,
    };
  }

  return response;
};

const clearUser = async (
  clearUserParams: ClearUserParams
): Promise<DTOModel<null>> => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    url: `${BaseAPI}/auth/remove`,
    data: clearUserParams,
  };

  const response: DTOModel<null> = {
    data: null,
    error: null,
    status: null,
  };

  try {
    const resp: AxiosResponse<null> = await axios(axiosOptions);

    response.status = resp.status;
  } catch (err: any) {
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status,
    };
  }

  return response;
};

const reverifyUser = async (
  reverifyUserParams: ClearUserParams
): Promise<DTOModel<RegisterUserPayload>> => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    url: `${BaseAPI}/auth/reverify`,
    data: reverifyUserParams,
  };

  const response: DTOModel<RegisterUserPayload> = {
    data: null,
    error: null,
    status: null,
  };

  try {
    const resp: AxiosResponse<null> = await axios(axiosOptions);
    response.data = resp.data;
    response.status = resp.status;
  } catch (err: any) {
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status,
    };
  }

  return response;
};

const registerUser = async (
  registerUserParams: RegisterUserParams
): Promise<DTOModel<RegisterUserPayload>> => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    url: `${BaseAPI}/auth/register`,
    data: registerUserParams,
  };

  const response: DTOModel<RegisterUserPayload> = {
    data: null,
    error: null,
    status: null,
  };

  try {
    const resp: AxiosResponse<RegisterUserPayload> = await axios(axiosOptions);

    response.data = resp.data;
    response.status = resp.status;
  } catch (err: any) {
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status,
    };
  }

  return response;
};

const verifyUser = async (
  verifyUserParams: VerifyUserParams
): Promise<DTOModel<VerifyUserPayload>> => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    url: `${BaseAPI}/auth/verify-code`,
    data: verifyUserParams,
  };

  const response: DTOModel<VerifyUserPayload> = {
    data: null,
    error: null,
    status: null,
  };

  try {
    const resp: AxiosResponse<VerifyUserPayload> = await axios(axiosOptions);

    response.data = resp.data;
    response.status = resp.status;
  } catch (err: any) {
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status,
    };
  }

  return response;
};

const getLastLoginDailyScanRewards = async (
  username: string
): Promise<string> => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
    url: `${BaseAPI}/users/last-daily-scan-rewards?username=${username}`,
  };

  const response: DTOModel<string> = {
    data: null,
    error: null,
    status: null,
  };

  try {
    const resp: AxiosResponse<string> = await axios(axiosOptions);

    response.data = resp.data;
    response.status = resp.status;
  } catch (err: any) {
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status,
    };
  }
  if (response.data) {
    return response.data;
  }
  return "";
};

const setLastLoginDailyScanRewards = async (
  params: SetLastLoginDailyScanRewardsParams
): Promise<void> => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    url: `${BaseAPI}/users/last-daily-scan-rewards`,
    data: params,
  };

  const response: DTOModel<string> = {
    data: null,
    error: null,
    status: null,
  };

  try {
    const resp: AxiosResponse<void> = await axios(axiosOptions);
    response.status = resp.status;
  } catch (err: any) {
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status,
    };
  }
};

const getStakeRecords = async (
  fromAddress: string
): Promise<DTOModel<StakeRecordPayload | null>> => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
    url: `${BaseAPI}/users/stake-record?fromAddress=${fromAddress}`,
  };

  const response: DTOModel<StakeRecordPayload> = {
    data: null,
    error: null,
    status: null,
  };

  try {
    const resp: AxiosResponse<StakeRecordPayload> = await axios(axiosOptions);

    response.data = resp.data;
    response.status = resp.status;
  } catch (err: any) {
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status,
    };
  }
  return response;
};

const setStakeRecords = async (
  params: SetStakeRecordsParams
): Promise<DTOModel<void>> => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    url: `${BaseAPI}/users/stake-record`,
    data: params,
  };

  const response: DTOModel<void> = {
    data: null,
    error: null,
    status: null,
  };

  try {
    const resp: AxiosResponse<void> = await axios(axiosOptions);
    response.status = resp.status;
  } catch (err: any) {
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status,
    };
  }
  return response;
};

const deleteStakeRecords = async (
  params: DeleteStakeRecordsParams
): Promise<DTOModel<void>> => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "delete",
    url: `${BaseAPI}/users/stake-record`,
    data: params,
  };

  const response: DTOModel<void> = {
    data: null,
    error: null,
    status: null,
  };

  try {
    const resp: AxiosResponse<void> = await axios(axiosOptions);
    response.status = resp.status;
  } catch (err: any) {
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status,
    };
  }
  return response;
};

export const WalletService = {
  checkUser,
  registerUser,
  verifyUser,
  reverifyUser,
  clearUser,
  getLastLoginDailyScanRewards,
  setLastLoginDailyScanRewards,
  getStakeRecords,
  setStakeRecords,
  deleteStakeRecords,
};
