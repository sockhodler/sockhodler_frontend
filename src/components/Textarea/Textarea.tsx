import React, { forwardRef } from "react";
import classNames from "classnames";
import classes from "./Textarea.module.scss";

interface Props {
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
  label?: string;
  required?: boolean;
  error?: boolean;
}

export const Textarea: React.FunctionComponent<Props> = forwardRef<
  HTMLTextAreaElement,
  Props
>(
  (
    { placeholder, onChange, value, className, label, required, error },
    ref
  ) => {
    const randomId = `textarea-${Math.random()}`;

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
        <textarea
          className={classes.textarea}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          id={randomId}
          ref={ref}
        />
      </div>
    );
  }
);
