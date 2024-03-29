import React, { forwardRef } from "react";
import classNames from "classnames";
import classes from "./TextField.module.scss";

interface Props {
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  underline?: boolean;
  label?: string;
  required?: boolean;
  size?: "large";
  accent?: "purple";
  type?: string;
  error?: boolean;
}

export const TextField: React.FunctionComponent<Props> = forwardRef<
  HTMLInputElement,
  Props
>(
  (
    {
      placeholder,
      onChange,
      value,
      className,
      underline,
      label,
      required,
      size,
      accent,
      type = "text",
      error,
    },
    ref
  ) => {
    const randomId = `text-field-${Math.random()}`;

    return (
      <div
        className={classNames(
          classes.container,
          underline && classes.underline,
          size && classes[`size-${size}`],
          accent && classes[`accent-${accent}`],
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
          type={type}
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
