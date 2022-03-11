import React from "react";

import classes from "./MintCard.module.scss";
import { Card } from "components";

interface Props {
  img: string;
}

export const MintCard: React.FunctionComponent<Props> = ({ children, img }) => {
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <img className={classes.img} src={img} alt="" />
        {children}
      </Card>
    </div>
  );
};
