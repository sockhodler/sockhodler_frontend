import { walletMiddleware } from "redux/wallet/wallet-middleware";

const middleware = [walletMiddleware];

if (process.env.NODE_ENV !== "production") {
  // middleware.push(logger);
}

export { middleware };
