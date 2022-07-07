import React from "react";
import { Layout, NFTGrid } from "components";
import { MarketplaceItemType } from "components/NFT/NFT";
import classes from "./index.module.scss";

export const NftAuctions: React.FunctionComponent = () => {
  const items: MarketplaceItemType[] = [];
  for (let i = 0; i < 20; i++) {
    items.push({
      name: "SockHodler 1/250",
      unitName: "SOCKHODLER",
      algoPrice: 125,
      currentBid: 5,
      endIn: 20,
    });
  }

  return (
    <Layout>
      <h2 className={classes.title}>NFT Auctions</h2>
      <span className={classes.subtitle}>Auction Collection</span>

      <NFTGrid
        back={{ label: "back to nft auctions", to: "/nft-auctions" }}
        list={items}
        onLoadMoreClick={() => console.log("onLoadMoreClick")}
      />
    </Layout>
  );
};
