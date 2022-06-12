import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import classes from "./LoadingIndicator.module.scss";

interface Props {
  className?: string;
  color?: string;
  fontSize?: number;
}

export const LoadingIndicator: React.FunctionComponent<Props> = ({
  className,
  color,
  fontSize,
}) => {
  return (
    <div className={classes.container}>
      <Spin
        indicator={
          <LoadingOutlined
            style={{ fontSize: fontSize || 36, color: "#ff39b0" }}
            spin
          />
        }
      />
    </div>
  );
};

export const SMLoadingIndicator: React.FunctionComponent<Props> = ({
  className,
  color,
  fontSize,
}) => (
  <div className={classes["sm-container"]}>
    <Spin
      indicator={
        <LoadingOutlined
          style={{ fontSize: fontSize || 24, color: "#ff39b0" }}
          spin
        />
      }
    />
  </div>
);
