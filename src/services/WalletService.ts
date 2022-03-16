import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { DTOModel } from "common/models/DTOModel";
import {
  CheckUserParams,
  CheckUserPayload,
} from "common/models/CheckUserModel";
import { ErrorModel } from "common/models/ErrorModel";

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

export const WalletService = {
  checkUser,
};
