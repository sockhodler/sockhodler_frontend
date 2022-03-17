import React from "react";

import { Layout, Button } from "components";
import classes from "./index.module.scss";

export const ConnectWallet: React.FunctionComponent = () => {
  return (
    <Layout>
      <div className={classes.container}>
        <h1 className={classes.title}>Connect wallet</h1>
        <p className={classes.subtitle}>
          To have access to this page you need to connect wallet
        </p>
        <Button>Connect wallet</Button>
      </div>
    </Layout>
  );
};
