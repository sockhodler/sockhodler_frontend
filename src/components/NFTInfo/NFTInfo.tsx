import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "assets/icons/arrow-right.svg";
import classes from "./NFTInfo.module.scss";

interface Props {
  value: string | null | undefined | number;
  name: string;
  to: string | undefined;
  size?: "small";
  className?: string;
}

export const NFTInfo: React.FunctionComponent<Props> = ({
  value,
  name,
  to,
  size,
  className,
}) => {
  return (
    <div
      className={classNames(classes.info, size && classes[size], className)}
      key={value}
    >
      <span className={classes.name}>{name}</span>
      <div className={classes.divider} />
      {to ? (
        <a href={to} className={classes.value} target="_blank" rel="noreferrer">
          {value}
        </a>
      ) : (
        <div className={classes.value}>{value}</div>
      )}
      {to && (
        <>
          <div className={classes.divider} />
          <a
            href={to}
            className={classes.action}
            target="_blank"
            rel="noreferrer"
          >
            <ArrowRightIcon />
          </a>
        </>
      )}
    </div>
  );
};
