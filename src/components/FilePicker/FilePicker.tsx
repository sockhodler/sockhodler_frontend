import React from "react";
import classNames from "classnames";
import classes from "./FilePicker.module.scss";
import { Button } from "components";

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  label?: string;
  required?: boolean;
  info?: string | JSX.Element;
}

export const FilePicker: React.FunctionComponent<Props> = ({
  onChange,
  className,
  label,
  required,
  info,
}) => {
  const randomId = `file-picker-${Math.random()}`;

  return (
    <div className={classNames(classes.container, className)}>
      {label && (
        <label className={classes.label} htmlFor={randomId}>
          {label} {required && <span>*</span>}
        </label>
      )}
      <input
        className={classes.input}
        type="file"
        onChange={onChange}
        id={randomId}
        required={required}
      />
      <Button accent="gr-top-bottom" className={classes.btn}>
        BROWSE
      </Button>
      {info && <p className={classes.info}>{info}</p>}
    </div>
  );
};
