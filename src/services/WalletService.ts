import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
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
import { ErrorModel } from "common/models/ErrorModel";
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
    method: "delete",
    url: `${BaseAPI}/auth/clear`,
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

export const WalletService = {
  checkUser,
  registerUser,
  verifyUser,
  reverifyUser,
  clearUser,
};
