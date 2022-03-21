import { walletMiddleware } from "redux/wallet/wallet-middleware";
import { tagsMiddleware } from "redux/tags/tags-middleware";

const middleware = [walletMiddleware, tagsMiddleware];

if (process.env.NODE_ENV !== "production") {
  // middleware.push(logger);
}

export { middleware };
