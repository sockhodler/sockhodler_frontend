import React from "react";
import classNames from "classnames";
import classes from "./Card.module.scss";

interface Props {
  className?: string;
  style?: any;
}

export const Card: React.FunctionComponent<Props> = ({
  className,
  children,
  style,
}) => {
  return (
    <div className={classNames(classes.card, className)} style={style}>
      {children}
    </div>
  );
};
