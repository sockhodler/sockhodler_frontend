import React, { forwardRef } from "react";

import classes from "./Checkbox.module.scss";
import { ReactComponent as CheckIcon } from "assets/icons/check.svg";
import classNames from "classnames";

interface Props {
  label?: string;
  className?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox: React.FunctionComponent<Props> = forwardRef<
  HTMLInputElement,
  Props
>(({ label, className, checked, onChange }, ref) => {
  const randomId = `checkbox-${Math.random()}`;

  return (
    <label
      htmlFor={randomId}
      className={classNames(classes.container, className)}
    >
      <input
        type="checkbox"
        id={randomId}
        className={classes.input}
        ref={ref}
        onChange={onChange}
        checked={checked}
      />
      <div className={classes.checkbox}>
        <CheckIcon />
      </div>
      <span className={classes.label}>{label}</span>
    </label>
  );
});
