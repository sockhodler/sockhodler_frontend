import React from "react";
import { Layout, NFTGrid } from "components";
import { MarketplaceItemType } from "components/NFT/NFT";
import classes from "./index.module.scss";
import { Wallet } from "./page-components";

export const Portfolio: React.FunctionComponent = () => {
  const items: MarketplaceItemType[] = [];
  for (let i = 0; i < 20; i++) {
    items.push({
      name: "SockHodler 1/250",
      unitName: "SOCKHODLER",
      info: [
        {
          label: "CREATOR ADDRESS",
          value: "SOCKSV5K4SS3...",
        },
        {
          label: "OWNER ADDRESS",
          value: "SOCKSV5K4SS3...",
        },
        {
          label: "OWNED",
          value: "1",
        },
      ],
    });
  }

  return (
    <Layout>
      <h2 className={classes.title}>Portfolio</h2>
      <span className={classes.subtitle}>Your NFTs</span>

      <Wallet />

      <NFTGrid
        back={{ label: "back to home", to: "/" }}
        list={items}
        // eslint-disable-next-line no-console
        onLoadMoreClick={() => console.log("onLoadMoreClick")}
        type="portfolio"
      />
    </Layout>
  );
};
