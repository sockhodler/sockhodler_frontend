import React, { useState } from "react";

import { Button, StakingItem, Switch, Tab, TextField } from "components";
import { StakingItemProps } from "components/StakingItem/StakingItem";
import classes from "./GenesisCoinsTab.module.scss";

interface Props {
  for: string;
}

export const GenesisCoinsTab: React.FC<Props> = ({ for: tabFor }) => {
  const [isStaked, setIsStaked] = useState(true);

  const rewardsItems: StakingItemProps[] = [];
  const depositItems: StakingItemProps[] = [];

  for (let i = 0; i < 5; i++) {
    rewardsItems.push({
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
          label: "Estimated APY",
          value: "10.41%",
        },
      ],
      onClaimRewardsClick: () => console.log("onClaimRewardsClick"),
      onWithdrawClick: () => console.log("onWithdrawClick"),
    });

    depositItems.push({
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
          label: "Deposit NFT",
          value: "to earn weekly rewards",
        },
        {
          label: "Estimated APY",
          value: "10.41%",
        },
      ],
      onDepositClick: () => console.log("onDepositClick"),
      onNftExplorerClick: () => console.log("onNftExplorerClick"),
      onExplorerClick: () => console.log("onExplorerClick"),
    });
  }

  return (
    <Tab for={tabFor}>
      <div className={classes.grid}>
        <div className={classes.header}>
          <TextField
            placeholder="SEARCH"
            className={classes.header__search}
            underline
          />
          <Switch
            label="STAKED"
            isActive={isStaked}
            onChange={(ia) => setIsStaked(ia)}
          />
        </div>

        <div className={classes.list}>
          {isStaked
            ? rewardsItems.map((item) => (
                <StakingItem {...item} type="reward" />
              ))
            : depositItems.map((item) => (
                <StakingItem {...item} type="deposit" />
              ))}
        </div>

        <Button size="huge" className={classes["load-more"]}>
          LOAD MORE
        </Button>
      </div>
    </Tab>
  );
};
