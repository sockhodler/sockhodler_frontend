import React from "react";

import { Tab } from "components";
import classes from "./SockBotTab.module.scss";

interface Props {
  for: string;
}

export const SockBotTab: React.FC<Props> = ({ for: tabFor }) => {
  return (
    <Tab for={tabFor}>
      <div className={classes["coming-soon"]}>
        <h2 className={classes["coming-soon__title"]}>SockBot NFT Staking</h2>
        <h3 className={classes["coming-soon__subtitle"]}>Coming Soon</h3>
      </div>
    </Tab>
  );
};
