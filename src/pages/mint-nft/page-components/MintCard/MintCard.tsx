import React from "react";

import classes from "./MintCard.module.scss";
import { Card } from "components";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "assets/icons/arrow-right.svg";

interface Props {
  img: string;
}

export const MintCard: React.FunctionComponent<Props> = ({ children, img }) => {
  return (
    <div className={classes.container}>
      <Link to="/" className={classes.back}>
        <ArrowRightIcon />
        <span>Back to home</span>
      </Link>

      <Card className={classes.card}>
        <img className={classes.img} src={img} alt="" />
        {children}
      </Card>
    </div>
  );
};
