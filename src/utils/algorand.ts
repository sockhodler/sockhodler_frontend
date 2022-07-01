import { Wallet } from "algorand-session-wallet";
import algosdk, { Transaction } from "algosdk";
import { NFT, NFTMetadata } from "./nft";
import { conf } from "./config";
import { MINT_PROGRESS_STEPS } from "utils/constants";

const client = new algosdk.Algodv2(conf.algodToken, conf.algod, "");
const platformAccount = algosdk.mnemonicToSecretKey(
  process.env.REACT_APP_PLATFORM_ACCOUNT_MNEMONIC ?? ""
);
const SOCKTokenIndex = 452047208;

export async function createToken(
  wallet: Wallet,
  md: NFTMetadata,
  url: string,
  decimals: number | undefined,
  setProgressStatus: any
): Promise<number> {
  const addr = wallet.getDefaultAccount();
  const suggested = await getSuggested(10);
  setProgressStatus(MINT_PROGRESS_STEPS.PREPARE_ASSET_PARAM);
  const create_txn = getAsaCreateTxn(
    suggested,
    addr,
    md.unitName,
    md.name,
    md.toHash(),
    url,
    decimals
  );

  setProgressStatus(MINT_PROGRESS_STEPS.SIGN_TXN);
  const [create_txn_s] = await wallet.signTxn([create_txn]);

  setProgressStatus(MINT_PROGRESS_STEPS.AWAIT_CONFIRM);
  const result = await sendWait([create_txn_s]);
  return result["asset-index"];
}

export async function sendALGOTokenFromUserToPlatformAccount(
  wallet: Wallet,
  fromAddress: string,
  toAddress: string,
  amount: number,
  setSendTokenInfo: any
): Promise<void> {
  const txParams = await client.getTransactionParams().do();

  const txn = await algosdk.makePaymentTxnWithSuggestedParams(
    fromAddress,
    toAddress,
    amount * 1000000,
    undefined,
    undefined,
    txParams
  );

  const [txn_s] = await wallet.signTxn([txn]);

  const { txId } = await client
    .sendRawTransaction(
      [txn_s].map((t) => {
        return t.blob;
      })
    )
    .do();
  const result = await waitForConfirmation(txId, 3);
  if (result) {
    setSendTokenInfo({
      loading: false,
      txId,
      amount,
      success: true,
    });
  }
}

export async function sendSOCKSTokenFromUserToPlatformAccount(
  wallet: Wallet,
  fromAddress: string,
  toAddress: string,
  amount: number,
  setSendTokenInfo: any
): Promise<void> {
  const txParams = await client.getTransactionParams().do();

  const txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
    fromAddress,
    toAddress,
    undefined,
    undefined,
    amount * 1000000,
    undefined,
    SOCKTokenIndex,
    txParams
  );

  const [txn_s] = await wallet.signTxn([txn]);

  const { txId } = await client
    .sendRawTransaction(
      [txn_s].map((t) => {
        return t.blob;
      })
    )
    .do();
  const result = await waitForConfirmation(txId, 3);
  if (result) {
    setSendTokenInfo({
      loading: false,
      txId,
      amount,
      success: true,
    });
  }
}

export async function optInUserAccountAsset(
  wallet: Wallet,
  addr: string,
  assetIndex: number
): Promise<any> {
  const txParams = await client.getTransactionParams().do();
  const txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
    addr,
    addr,
    undefined,
    undefined,
    0,
    undefined,
    assetIndex,
    txParams
  );

  const [txn_s] = await wallet.signTxn([txn]);

  const { txId } = await client
    .sendRawTransaction(
      [txn_s].map((t) => {
        return t.blob;
      })
    )
    .do();
  const result = await waitForConfirmation(txId, 3);
  return result;
}

export async function optInPlatformAccountAsset(
  addr: string,
  assetIndex: number
): Promise<any> {
  const txParams = await client.getTransactionParams().do();

  const txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
    addr,
    addr,
    undefined,
    undefined,
    0,
    undefined,
    assetIndex,
    txParams
  );
  const txn_s = await txn.signTxn(platformAccount.sk);
  // const [txn_s] = await wallet.signTxn([txn]);

  const { txId } = await client.sendRawTransaction(txn_s).do();
  const result = await waitForConfirmation(txId, 3);
  return result;
}

export async function transferAssetFromPlatformAccountToUser(
  fromAddress: string,
  toAddress: string,
  amount: number,
  assetIndex: number
): Promise<any> {
  const txParams = await client.getTransactionParams().do();

  const txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
    fromAddress,
    toAddress,
    undefined,
    undefined,
    amount,
    undefined,
    assetIndex,
    txParams
  );

  const txn_s = await txn.signTxn(platformAccount.sk);
  // const [txn_s] = await wallet.signTxn([txn]);

  const { txId } = await client.sendRawTransaction(txn_s).do();
  const result = await waitForConfirmation(txId, 3);
  return result;
}
export async function transferAssetFromUserToPlatformAccount(
  wallet: Wallet,
  fromAddress: string,
  toAddress: string,
  amount: number,
  assetIndex: number
): Promise<any> {
  const txParams = await client.getTransactionParams().do();

  const txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
    fromAddress,
    toAddress,
    undefined,
    undefined,
    amount,
    undefined,
    assetIndex,
    txParams
  );

  const [txn_s] = await wallet.signTxn([txn]);

  const { txId } = await client
    .sendRawTransaction(
      [txn_s].map((t) => {
        return t.blob;
      })
    )
    .do();
  const result = await waitForConfirmation(txId, 3);
  return result;
}

export async function sendRewardSOCKSTokenFromPlatformToUser(
  toAddress: string,
  amount: number,
  setScanRewardsInfo: any
): Promise<void> {
  const txParams = await client.getTransactionParams().do();

  const txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
    platformAccount.addr,
    toAddress,
    undefined,
    undefined,
    amount * 1000000,
    undefined,
    SOCKTokenIndex,
    txParams
  );

  const signed = await txn.signTxn(platformAccount.sk);

  const { txId } = await client.sendRawTransaction(signed).do();
  const result = await waitForConfirmation(txId, 3);
  if (result) {
    setScanRewardsInfo({
      loading: false,
      txId,
      amount,
      success: true,
    });
  }
}

export async function getSuggested(rounds: number) {
  const txParams = await client.getTransactionParams().do();
  return { ...txParams, lastRound: txParams.firstRound + rounds };
}

export function getPayTxn(suggestedParams: any, addr: string): Transaction {
  return new Transaction({
    type: "pay",
    from: addr,
    to: addr,
    amount: 0,
    ...suggestedParams,
  });
}

export function getAsaCreateTxn(
  suggestedParams: any,
  addr: string,
  unitName: string | undefined,
  name: string,
  mdhash: Uint8Array,
  url: string,
  decimals: number | undefined
): Transaction {
  return new Transaction({
    from: addr,
    assetName: name,
    assetUnitName: unitName,
    assetURL: url,
    assetMetadataHash: mdhash,
    assetManager: addr,
    assetReserve: addr,
    assetTotal: Math.pow(10, decimals || 0),
    assetDecimals: decimals,
    type: "acfg",
    ...suggestedParams,
  });
}

export async function sendWait(signed: any[]): Promise<any> {
  try {
    const { txId } = await client
      .sendRawTransaction(
        signed.map((t) => {
          return t.blob;
        })
      )
      .do();
    const result = await waitForConfirmation(txId, 3);
    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return undefined;
}

export async function waitForConfirmation(
  txId: string | null,
  timeout: number
) {
  if (client == null || txId == null || timeout < 0) {
    throw new Error("Bad arguments.");
  }

  const status = await client.status().do();
  if (typeof status === "undefined")
    throw new Error("Unable to get node status");

  const startround = status["last-round"] + 1;
  let currentround = startround;

  /* eslint-disable no-await-in-loop */
  while (currentround < startround + timeout) {
    const pending = await client.pendingTransactionInformation(txId).do();

    if (pending !== undefined) {
      if (pending["confirmed-round"] !== null && pending["confirmed-round"] > 0)
        return pending;

      if (pending["pool-error"] != null && pending["pool-error"].length > 0)
        throw new Error(
          `Transaction Rejected pool error${pending["pool-error"]}`
        );
    }

    await client.statusAfterBlock(currentround).do();
    currentround += 1;
  }

  /* eslint-enable no-await-in-loop */
  throw new Error(`Transaction not confirmed after ${timeout} rounds!`);
}

export async function getToken(assetId: number): Promise<any> {
  const res = await client.getAssetByID(assetId).do();
  return res;
}

export async function getCollection(address: string): Promise<any[]> {
  const results = await client.accountInformation(address).do();

  const plist = [];
  for (const a in results.assets) {
    if (results.assets[a].amount > 0)
      plist.push(getToken(results.assets[a]["asset-id"]));
  }

  const assets = await Promise.all(plist);

  const collectionRequests = assets.map((a) => {
    return NFT.fromToken(a);
  });
  // .filter((a)=>{ return NFT.isArc3(a) })

  return Promise.all(collectionRequests);
}
