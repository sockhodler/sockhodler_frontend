import React from "react";
import classes from "./Switch.module.scss";

interface Props {
  label?: string;
}

const randomId = `switch-${Math.random() * 10}`;

export const Switch: React.FunctionComponent<Props> = ({ label }) => {
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
