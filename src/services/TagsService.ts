// import { AxiosRequestConfig } from "axios";
import {
  DTOModel,
  AuthenticateTagParams,
  AuthenticateTagPayload,
} from "common/models";

// const SmartSealBaseAPI = process.env.REACT_APP_SMART_SEAL_API_URL;

const authenticateTag = async (
  data: AuthenticateTagParams
): Promise<DTOModel<AuthenticateTagPayload>> => {
  // const axiosOptions: AxiosRequestConfig = {
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   method: "post",
  //   url: `${SmartSealBaseAPI}/authenticate`,
  //   data: JSON.stringify(data),
  // };

  const response: DTOModel<AuthenticateTagPayload> = {
    data: null,
    error: null,
    status: null,
  };

  try {
    // const resp: AxiosResponse<AuthenticateTagPayload> = await axios(
    //   axiosOptions
    // );
    const resp = await fetch("https://socks.smartseal.io/api/authenticate/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
    });
    response.data = JSON.parse(await resp.text());
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
