import React from "react";
import { Layout, Tabs, Tab, StakingGrid } from "components";
import { StakingItemProps } from "components/StakingItem/StakingItem";
import classes from "./index.module.scss";

export const NftStaking: React.FunctionComponent = () => {
  const items: StakingItemProps[] = [];
  for (let i = 0; i < 20; i++) {
    items.push({
      title: "SockHodler Genesis #00",
      img: "https://unsplash.it/200/200",
      details: [
        {
          label: "ASA ID",
          value: "552690161",
        },
        {
          label: "Amount Held",
          value: "0",
        },
        {
          label: "Amount Staked",
          value: "1",
        },
      ],
      info: [
        {
          label: "Estimated Daily Rewards",
          value: "15 SOCKS Tokens",
        },
        {
          label: "Estimated APR",
          value: "10.41%",
        },
      ],
      onWithdrawClick: () => console.log("on onWithdrawClick click"),
      onWebsiteClick: () => console.log("on onWebsiteClick click"),
      onExplorerClick: () => console.log("on onExplorerClick click"),
    });
  }

  return (
    <Layout>
      <h2 className={classes.title}>NFT Staking</h2>
      <span className={classes.subtitle}>
        Earn <strong>SOCKS</strong> Rewards
      </span>

      <Tabs
        tabs={[
          {
            label: "Base Collection",
            value: "base-collection",
          },
          {
            label: "Genesis Collection",
            value: "genesis-collection",
          },
          {
            label: "Partner Pools",
            value: "partner-pools",
          },
        ]}
        className={classes.tabs}
      >
        <Tab for="base-collection">
          <StakingGrid list={items} />
        </Tab>

        <Tab for="genesis-collection">genesis-collection</Tab>

        <Tab for="partner-pools">partner-pools</Tab>
      </Tabs>
    </Layout>
  );
};
