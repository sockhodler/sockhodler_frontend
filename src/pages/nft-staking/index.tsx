import React from "react";

import { Layout, Tabs } from "components";
import classes from "./index.module.scss";
import { GenesisCoinsTab, SockBotTab } from "./page-components";

export const NftStaking: React.FunctionComponent = () => {
  return (
    <Layout>
      <h2 className={classes.title}>NFT Staking</h2>
      <span className={classes.subtitle}>
        Earn <strong>SOCKS</strong> Rewards
      </span>

      <Tabs
        tabs={[
          {
            label: "Genesis Coins",
            value: "genesis-coins",
          },
          {
            label: "SockBot",
            value: "sock-bot",
          },
        ]}
        mobileSize="small"
        className={classes.tabs}
      >
        <GenesisCoinsTab for="genesis-coins" />
        <SockBotTab for="sock-bot" />
      </Tabs>
    </Layout>
  );
};
