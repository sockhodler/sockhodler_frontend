import React from "react";

import classes from "./Success.module.scss";
import { Button } from "components";

interface Props {
  onBackClick?: () => void;
}

export const Success: React.FunctionComponent<Props> = ({ onBackClick }) => {
  return (
    <div className={classes.success}>
      <p className={classes.message}>
        Your Asset has been minted successfully
      </p>

      <div className={classes.divider} />

      <Button className={classes.btn} accent="red" onClick={onBackClick}>
        BACK TO MINTING PAGE
      </Button>
    </div>
  );
};
