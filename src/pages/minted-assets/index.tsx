import React from "react";

import classes from "./index.module.scss";
import { Layout, Button } from "components";
import { AssetsList } from "./page-components";

export const MintedAssets: React.FunctionComponent = () => {
  const items = [];
  for (let i = 0; i < 10; i++) {
    items.push({
      img: "https://unsplash.it/200/200",
      title: "Diamond Retro GenesiS",
      details: [
        {
          label: "ASA ID",
          value: "499676627",
        },
        {
          label: "Unit Name",
          value: "SOXGEN00",
        },
        {
          label: "Total Supply",
          value: "1",
        },
      ],
    });
  }

  return (
    <Layout>
      <h2 className={classes.title}>Minted Assets</h2>
      <Button className={classes.action} accent="red">
        BACK TO MINTING PAGE
      </Button>

      <AssetsList items={items} />
    </Layout>
  );
};
