import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { DTOModel } from "common/models/DTOModel";
// import { ErrorModel } from "common/models/ErrorModel";
import { SendEmailPayload, SendEmailParams } from "common/models/EmailModel";

const BaseAPI = process.env.REACT_APP_API_URL;

const redeemNFTSendEmail = async (
  sendEmailParams: SendEmailParams
): Promise<DTOModel<SendEmailPayload>> => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    url: `${BaseAPI}/email/send`,
    data: sendEmailParams,
  };

  const response: DTOModel<SendEmailPayload> = {
    data: null,
    error: null,
    status: null,
  };

  try {
    const resp: AxiosResponse<SendEmailPayload> = await axios(axiosOptions);

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

export const EmailService = {
  redeemNFTSendEmail,
};
