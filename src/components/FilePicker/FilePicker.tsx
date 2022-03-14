import React, { forwardRef } from "react";
import classNames from "classnames";
import classes from "./FilePicker.module.scss";
import { Button } from "components";

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  label?: string;
  required?: boolean;
  info?: string | JSX.Element;
  error?: boolean;
}

export const FilePicker: React.FunctionComponent<Props> = forwardRef<
  HTMLInputElement,
  Props
>(({ onChange, className, label, required, info, error }, ref) => {
  const randomId = `file-picker-${Math.random()}`;

  const handleOpenFilePicker = () => {
    const targetInput = document.getElementById(randomId) as HTMLInputElement;
    targetInput?.click();
  };

  return (
    <div
      className={classNames(
        classes.container,
        error && classes.error,
        className
      )}
    >
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
        ref={ref}
      />
      <Button
        accent="gr-top-bottom"
        className={classes.btn}
        onClick={handleOpenFilePicker}
      >
        BROWSE
      </Button>
      {info && <p className={classes.info}>{info}</p>}
    </div>
  );
});
