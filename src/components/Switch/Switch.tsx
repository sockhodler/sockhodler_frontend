import React from "react";
import classes from "./Switch.module.scss";

interface Props {
  label?: string;
}

export const Switch: React.FunctionComponent<Props> = ({ label }) => {
  const randomId = `switch-${Math.random()}`;

  return (
    <label className={classes.switch} htmlFor={randomId}>
      <span className={classes.label}>{label}</span>
      <input type="checkbox" className={classes.input} id={randomId} />
      <div className={classes.container}>
        <div className={classes.ball} />
      </div>
    </label>
  );
};
