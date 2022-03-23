export const MINT_PROGRESS_STEPS = {
  // 0
  INITIAL: {
    status: 0,
    note: "",
  },
  // 1
  CONNECT_WALLET: {
    status: 2,
    note: "Connecting wallet...",
  },
  // 2
  CAPTURE_METADATA: {
    status: 10,
    note: "Capturing Metadata...",
  },
  // 3
  IMAGE_INTEGRITY: {
    status: 30,
    note: "Initegrating Image...",
  },
  // 4
  PUT_TO_IPFS: {
    status: 50,
    note: "Uploading an image to IPFS...",
  },
  // 5
  PREPARE_ASSET_PARAM: {
    status: 60,
    note: "Preparing asset parameters...",
  },
  // 6
  SIGN_TXN: {
    status: 70,
    note: "Signing transaction...",
  },
  // 7
  AWAIT_CONFIRM: {
    status: 80,
    note: "Awaiting confirmation...",
  },
  // 8
  GET_ASSET_IDENTIFIER: {
    status: 90,
    note: "Getting asset identifier...",
  },
};
