import React from "react";
import { Button, Card } from "components";
import classes from "./StakingItem.module.scss";
import classNames from "classnames";

export interface StakingItemProps {
  title: string;
  img: string;
  details: { label: string; value: string }[];
  info: { label: string; value: string }[];
  onClaimRewardsClick?: () => void;
  onWithdrawClick?: () => void;
  onDepositClick?: () => void;
  onNftExplorerClick?: () => void;
  onExplorerClick?: () => void;
  type?: "reward" | "deposit";
}

export const StakingItem: React.FunctionComponent<StakingItemProps> = ({
  title,
  img,
  details,
  info,
  onClaimRewardsClick,
  onWithdrawClick,
  onDepositClick,
  onNftExplorerClick,
  onExplorerClick,
  type = "reward",
}) => {
  return (
    <Card className={classes.container}>
      <div className={classes.header}>{title}</div>

      <div className={classes.row}>
        <div className={classes.column}>
          <img src={img} className={classes.img} alt="" />
        </div>
        <div className={classes.divider} />
        <div className={classes.column}>
          <ul className={classes.details}>
            {details.map((detail) => (
              <li className={classes.detail} key={detail.label}>
                <span>{detail.label}:</span>
                <span>{detail.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.divider} />
        <div className={classes.column}>
          {info.map((inf) => (
            <div className={classes.info} key={inf.label}>
              <span>{inf.label}</span>
              <span>{inf.value}</span>
            </div>
          ))}
        </div>
        <div className={classes.divider} />
        {type === "reward" && (
          <div
            className={classNames(classes.column, classes["actions-reward"])}
          >
            <Button accent="red" sharp onClick={onClaimRewardsClick}>
              CLAIM REWARDS
            </Button>
            <Button accent="purple" sharp onClick={onWithdrawClick}>
              WITHDRAW
            </Button>
          </div>
        )}

        {type === "deposit" && (
          <div
            className={classNames(classes.column, classes["actions-deposit"])}
          >
            <Button accent="red" sharp onClick={onDepositClick}>
              Deposit NFT
            </Button>
            <Button accent="purple" sharp onClick={onNftExplorerClick}>
              NFTEXPLORER
            </Button>
            <Button accent="black" sharp onClick={onExplorerClick}>
              EXPLORER
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
