import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import classes from "./LoadingIndicator.module.scss"

interface Props {
    className?: string
    color?: string
    fontSize: string
  }

export const LoadingIndicator: React.FunctionComponent = () => {
return (
  <div className={classes.container}>
    <Spin
      indicator={
        <LoadingOutlined style={{ fontSize: 36, color: "#ff39b0" }} spin />
      }
    />
  </div>
)}

export const SMLoadingIndicator: React.FunctionComponent = () => (
  <div className={classes["sm-container"]}>
    <Spin
      indicator={
        <LoadingOutlined style={{ fontSize: 24, color: "#ff39b0" }} spin />
      }
    />
  </div>
)
