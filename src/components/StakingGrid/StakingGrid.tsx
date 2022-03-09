import React from "react";
import { StakingItem, TextField, Switch } from "components";
import { StakingItemProps } from "components/StakingItem/StakingItem";
import classes from "./StakingGrid.module.scss";

interface Props {
  list: StakingItemProps[];
}

export const StakingGrid: React.FunctionComponent<Props> = ({ list }) => {
  return (
    <div className={classes.grid}>
      <div className={classes.header}>
        <TextField placeholder="SEARCH" className={classes.header__search} />
        <Switch label="STAKED" />
      </div>

      <div className={classes.list}>
        {list.map((item) => (
          <StakingItem {...item} />
        ))}
      </div>
    </div>
  );
};
