import React, { useContext } from "react";
import classNames from "classnames";
import { LayoutTabContext } from "components/Layout/Layout";
import classes from "./LayoutTab.module.scss";

const useTabsContext = () => {
  const context = useContext(LayoutTabContext);
  if (!context) {
    throw new Error("LayoutTab must be inside of <Layout />");
  }
  return context;
};

interface Props {
  for: string;
}

export const LayoutTab: React.FunctionComponent<Props> = ({
  for: forTab,
  children,
}) => {
  const selected = useTabsContext();

  return (
    <div
      className={classNames(
        classes.tab,
        selected === forTab && classes["tab--active"]
      )}
    >
      {children}
    </div>
  );
};
