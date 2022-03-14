import React from "react";

import classes from "./Checkbox.module.scss";
import { ReactComponent as CheckIcon } from "assets/icons/check.svg";
import classNames from "classnames";

interface Props {
  label?: string;
  className?: string;
}

export const Checkbox: React.FunctionComponent<Props> = ({
  label,
  className,
}) => {
  const randomId = `checkbox-${Math.random()}`;

  return (
    <label
      htmlFor={randomId}
      className={classNames(classes.container, className)}
    >
      <input type="checkbox" id={randomId} className={classes.input} />
      <div className={classes.checkbox}>
        <CheckIcon />
      </div>
      <span className={classes.label}>{label}</span>
    </label>
  );
};
