import React from "react";
import classNames from "classnames";
import classes from "./Button.module.scss";
import ReactTooltip from "react-tooltip";
import { ReactComponent as LoadingIcon } from "assets/icons/loading-spinner.svg";

interface Props {
  className?: string;
  onClick?: () => void;
  accent?: "red" | "black" | "purple" | "gr-top-bottom" | "grey";
  size?: "tiny" | "small" | "large" | "huge";
  sharp?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  tooltip?: string;
  loading?: boolean;
}

export const Button: React.FunctionComponent<Props> = ({
  className,
  children,
  onClick,
  accent,
  size,
  sharp,
  type = "button",
  disabled,
  tooltip,
  loading,
}) => {
  const handleOnClick = () => {
    if (!disabled) onClick?.();
  };

  return (
    <>
      <button
        className={classNames(
          classes.btn,
          accent && classes[`color-${accent}`],
          size && classes[`size-${size}`],
          sharp && classes["shape-sharp"],
          disabled && classes.disabled,
          className
        )}
        onClick={handleOnClick}
        type={type}
        data-tip={tooltip}
      >
        {loading && (
          <div className={classes.loading}>
            <LoadingIcon />
          </div>
        )}
        {children}
      </button>

      {tooltip && (
        <ReactTooltip effect="solid" place="top" className={classes.tooltip} />
      )}
    </>
  );
};
