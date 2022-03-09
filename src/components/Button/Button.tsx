import React from "react";
import classNames from "classnames";
import classes from "./Button.module.scss";

interface Props {
  className?: string;
  onClick?: () => void;
  accent?: "red" | "black" | "purple";
  size?: "tiny" | "small" | "large" | "huge";
  sharp?: boolean;
}

export const Button: React.FunctionComponent<Props> = ({
  className,
  children,
  onClick,
  accent,
  size,
  sharp,
}) => {
  return (
    <button
      className={classNames(
        classes.btn,
        accent && classes[`color-${accent}`],
        size && classes[`size-${size}`],
        sharp && classes["shape-sharp"],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
