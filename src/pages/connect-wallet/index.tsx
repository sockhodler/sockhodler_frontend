import React from "react";

import { Layout, Button } from "components";
import { useDispatch } from "react-redux";
import { setModalStep } from "redux/wallet/wallet-slice";
import classes from "./index.module.scss";

export const ConnectWallet: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const handleConnectWalletClick = () => {
    dispatch(setModalStep(1));
  };
  return (
    <Layout>
      <div className={classes.container}>
        <h1 className={classes.title}>Connect wallet</h1>
        <p className={classes.subtitle}>
          To have access to this page you need to connect wallet
        </p>
        <Button onClick={handleConnectWalletClick}>Connect wallet</Button>
      </div>
    </Layout>
  );
};
