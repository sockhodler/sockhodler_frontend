import React from "react";
import classes from "./Switch.module.scss";

interface Props {
  label?: string;
  isActive?: boolean;
  onChange?: (ia: boolean) => void;
}

export const Switch: React.FunctionComponent<Props> = ({
  label,
  isActive,
  onChange,
}) => {
  const randomId = `switch-${Math.random()}`;

  return (
    <label className={classes.switch} htmlFor={randomId}>
      <span className={classes.label}>{label}</span>
      <input
        type="checkbox"
        className={classes.input}
        id={randomId}
        checked={isActive}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <div className={classes.container}>
        <div className={classes.ball} />
      </div>
    </label>
  );
};
