/* eslint-disable no-console */
import axios from "axios";
import { ipfsURL, NFTMetadata } from "./nft";
import { conf } from "./config";

/*
 Currently an issue with resolving ipfs-car module in web3.storage when using react-scripts
 We just use the prebuilt one but with no types we have to just ignore the issue for now
//import { Web3Storage } from 'web3.storage'
*/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";

const storage = new Web3Storage({ token: conf.storageToken });
const pinataJsonURL = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

export async function putToIPFS(file: File, md: NFTMetadata): Promise<string> {
  try {
    const imgAdded = await storage.put([file], { wrapWithDirectory: false });
    // setProgress({
    //     status: 40,
    //     note: "Uploading asset data to IPFS...",
    //   })
    md.image = ipfsURL(imgAdded);

    return await storage.put([md.toFile()], { wrapWithDirectory: false });
  } catch (err) {
    console.error(err);
  }
  return "";
}

export const putToPinata = async (
  file: File,
  md: NFTMetadata
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    if (conf.pinataURL) {
      const res = await axios.post(conf.pinataURL, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${conf.pinataJWT}`,
        },
      });
      const hash = res.data?.IpfsHash ?? "";
      md.image = `${conf.ipfsGateway}${hash}`;

      const assRes = await axios.post(pinataJsonURL, md, {
        headers: {
          Authorization: `Bearer ${conf.pinataJWT}`,
        },
      });

      return assRes.data?.IpfsHash ?? "";
    }
    return "";
    //   setProgress({
    //     status: 40,
    //     note: "Uploading asset data to IPFS...",
    //   })
  } catch (err) {
    console.error(err);
    return "";
  }
};

export async function getMimeTypeFromIpfs(url: string): Promise<string | null> {
  const req = new Request(url, { method: "HEAD" });
  const resp = await fetch(req);
  return resp.headers.get("Content-Type");
}

export async function getMetaFromIpfs(url: string): Promise<NFTMetadata> {
  const req = new Request(url);
  const resp = await fetch(req);
  const body = await resp.blob();
  return new NFTMetadata(JSON.parse(await body.text()));
}
