import React from "react";
import { Layout, Tabs, Tab, NFTGrid } from "components";
import { NftProps } from "components/NFT/NFT";
import classes from "./index.module.scss";

export const Marketplace: React.FunctionComponent = () => {
  const items: NftProps[] = [];
  for (let i = 0; i < 20; i++) {
    items.push({
      title: "SockHodler 1/250",
      subtitle: "SOCKHODLER",
      price: 125,
      unitMin: 1,
      unitMax: 250,
      unitAvailable: 24,
    });
  }

  return (
    <Layout>
      <h2 className={classes.title}>Marketplace</h2>
      <span className={classes.subtitle}>Physically-Backed NFT Socks</span>

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
            label: "Collabs",
            value: "collabs",
          },
        ]}
        mobileSize="small"
      >
        <Tab for="base-collection">
          <NFTGrid
            back={{ label: "back to home", to: "/" }}
            list={items}
            onLoadMoreClick={() => console.log("onLoadMoreClick")}
          />
        </Tab>

        <Tab for="genesis-collection">genesis-collection</Tab>

        <Tab for="collabs">collabs</Tab>
      </Tabs>
    </Layout>
  );
};
