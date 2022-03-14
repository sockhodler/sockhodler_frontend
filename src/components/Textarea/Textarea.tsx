import React from "react";
import classNames from "classnames";
import classes from "./Textarea.module.scss";

interface Props {
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
  label?: string;
  required?: boolean;
}

export const Textarea: React.FunctionComponent<Props> = ({
  placeholder,
  onChange,
  value,
  className,
  label,
  required,
}) => {
  const randomId = `textarea-${Math.random()}`;

  return (
    <div className={classNames(classes.container, className)}>
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
        required={required}
      />
    </div>
  );
};
