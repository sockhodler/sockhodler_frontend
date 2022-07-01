export const config = {
  apiUrl: process.env.REACT_APP_API_URL,
  storageToken: process.env.REACT_APP_STORAGE_TOKEN,
  ipfsGateway: process.env.REACT_APP_IPFS_GATEWAY,
  pinataURL: process.env.REACT_APP_PINATA_URL,
  pinataJWT: process.env.REACT_APP_PINATA_JWT,
  blockExplorer: process.env.REACT_APP_BLOCK_EXPLORER,
  explorerApi: process.env.REACT_APP_ALGO_EXPLORER_API,
  baseServer: process.env.REACT_APP_ALGO_BASE_SERVER,
  baseIndexer: process.env.REACT_APP_ALGO_BASE_INDEXER,
  network: process.env.REACT_APP_ALGO_NETWORK,
  algodToken: {
    "X-API-key": process.env.REACT_APP_PURESTAKE_KEY,
  },
  smartContractUrl: process.env.REACT_APP_SMART_CONTRACT_URL,
  imageOptimizer: process.env.REACT_APP_IMAGE_OPTIMIZER,
  algoExplorerIndexerApi: process.env.REACT_APP_ALGO_EXPLORER_API_INDEXER,
};

export const getAddrUrl = (addr: string) =>
  `${config.blockExplorer}address/${addr}`;

export const getAsaUrl = (id: string | number) =>
  `${config.blockExplorer}/asset/${id}`;

export const contentLoaderColors = {
  background: "#787878",
  foreground: "#333333",
};
