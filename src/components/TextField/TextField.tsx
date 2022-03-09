import React from "react";
import classNames from "classnames";
import classes from "./TextField.module.scss";

interface Props {
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

export const TextField: React.FunctionComponent<Props> = ({
  placeholder,
  onChange,
  value,
  className,
}) => {
  return (
    <input
      className={classNames(classes.input, className)}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};
