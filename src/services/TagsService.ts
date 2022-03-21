import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  DTOModel,
  AuthenticateTagParams,
  ErrorModel,
  TagModel,
  AuthenticateTagPayload,
} from "common/models";

const SmartSealBaseAPI = process.env.REACT_APP_SMART_SEAL_API_URL;

const authenticateTag = async (
  data: AuthenticateTagParams
): Promise<DTOModel<AuthenticateTagPayload>> => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    url: `${SmartSealBaseAPI}/authenticate`,
    data: JSON.stringify(data),
  };

  const response: DTOModel<AuthenticateTagPayload> = {
    data: null,
    error: null,
    status: null,
  };

  try {
    const resp: AxiosResponse<AuthenticateTagPayload> = await axios(
      axiosOptions
    );

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

export const TagsService = {
  authenticateTag,
};
