import React from "react";
import { Layout, NFTMarketplaceDetails } from "components";
import classes from "./index.module.scss";
import { ReactComponent as AlgoIcon } from "assets/icons/algo.svg";

const infoItems = [
  {
    title: "Price",
    value: (
      <span>
        125
        <AlgoIcon />
      </span>
    ),
  },
  {
    title: "Quantity Remaining",
    value: "50",
  },
  {
    title: "Total Minted",
    value: "250",
  },
  {
    value: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed ",
  },
];

const details = [
  {
    name: "Asset ID",
    value: "545366852",
    to: "/",
  },
  {
    name: "App ID",
    value: "6112547",
    to: "/",
  },
  {
    name: "Royalty",
    value: "5%",
    to: "/",
  },
  {
    name: "Creator",
    value: "SOCKSV3AE5R4BS5...",
    to: "/",
  },
];

export const MarketplaceDetails: React.FunctionComponent = () => {
  return (
    <Layout>
      <h2 className={classes.title}>Marketplace</h2>
      <span className={classes.subtitle}>NFT</span>

      <NFTMarketplaceDetails
        back={{ label: "back to home", to: "/" }}
        title="SockHolder 1/250"
        imgSrc="https://unsplash.it/700/700"
        actionLabel="BUY NOW"
        onActionClick={() => console.log("on action click")}
        info={infoItems}
        details={details}
      />
    </Layout>
  );
};
