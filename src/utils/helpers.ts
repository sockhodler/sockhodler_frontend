import axios from "axios";
import { config } from "common/config/conf";
import { ARC3_URL_SUFFIX, ARC69_URL_SUFFIX } from "utils/nft";

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const formatURL = async (url: string): Promise<any> => {
  if (url && url.includes("ipfs://")) {
    const urlArr = url.split("://");
    if (url.endsWith(ARC3_URL_SUFFIX) || url.endsWith(ARC69_URL_SUFFIX)) {
      const response = await axios.get(
        `https://sockhodler.mypinata.cloud/ipfs/${urlArr[1]}`
      );
      if (response.data.image) {
        const respURL = await formatURL(response.data.image);
        return respURL;
      }
    } else {
      const returnURL = `${config.ipfsGateway}${urlArr[1]}`;
      return returnURL;
    }
  } else if (url && url.includes("ipfs.io")) {
    const replaceURL = url.replace("ipfs.io", "sockhodler.mypinata.cloud");
    return replaceURL;
  } else if (url && url.includes("tinyurl.com")) {
    const res = await axios.get(url);
    if (res.request.responseURL) {
      const replaceURL = res.request.responseURL.replace(
        "gateway.pinata.cloud",
        "sockhodler.mypinata.cloud"
      );
      return replaceURL;
    } else if (res.request.res.responseUrl) {
      const replaceURL = res.request.res.responseUrl.replace(
        "gateway.pinata.cloud",
        "sockhodler.mypinata.cloud"
      );
      return replaceURL;
    }
    return url;
  } else if (url && url.includes("rebrand.ly")) {
    const res = await axios.get(`https://${url}`);
    if (res.request.responseURL) {
      const respURL = await formatURL(res.request.responseURL);
      return respURL;
    } else if (res.request.res.responseUrl) {
      const respURL = await formatURL(res.request.res.responseUrl);
      return respURL;
    }
    return url;
  } else if (url && url.includes("gateway.pinata.cloud")) {
    const replaceURL = url.replace(
      "gateway.pinata.cloud",
      "sockhodler.mypinata.cloud"
    );
    return replaceURL;
  } else if (url && url.includes("bit.ly")) {
    const res = await axios.get(`${config.apiUrl}/format-url?url=${url}`);
    return res.data;
  } else if (
    url &&
    (url.endsWith(ARC3_URL_SUFFIX) || url.endsWith(ARC69_URL_SUFFIX))
  ) {
    const response = await axios.get(url);
    if (response.data.image) {
      const respURL = await formatURL(response.data.image);
      return respURL;
    }
  } else {
    return url;
  }
};
