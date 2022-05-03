type Config = {
  apiUrl: string | undefined;
  network: string | undefined; // The network to use for creating nfts
  storageToken: string | undefined; // The token provided by web3.storage
  ipfsGateway: string | undefined;
  pinataURL: string | undefined;
  pinataJWT: string | undefined;
  explorerApi: string | undefined;
  algod: string | undefined; // The Algod api url to use
  blockExplorer: string | undefined; // The Block Explorer to allow linking out to
  imageOptimizer: string | undefined;
};

export const conf: Config = {
  apiUrl: process.env.REACT_APP_API_URL,
  storageToken: process.env.REACT_APP_STORAGE_TOKEN,
  ipfsGateway: process.env.REACT_APP_IPFS_GATEWAY,
  pinataURL: process.env.REACT_APP_PINATA_URL,
  pinataJWT: process.env.REACT_APP_PINATA_JWT,
  blockExplorer: process.env.REACT_APP_BLOCK_EXPLORER,
  explorerApi: process.env.REACT_APP_ALGO_EXPLORER_API,
  network: process.env.REACT_APP_ALGO_NETWORK,
  imageOptimizer: process.env.REACT_APP_IMAGE_OPTIMIZER,
  // algod: "https://algoexplorerapi.io",
  algod: "https://testnet.algoexplorerapi.io",
};

export const getAddrUrl = (addr: string) =>
  `${conf.blockExplorer}address/${addr}`;

export const getAsaUrl = (id: string | number) =>
  `${conf.blockExplorer}/asset/${id}`;
