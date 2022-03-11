import React, { useState, useEffect, createContext } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "components";
import classes from "./Layout.module.scss";

export const LayoutTabContext = createContext<string>("");
LayoutTabContext.displayName = "LayoutTabContext";

interface Props {
  tabs?: { label: string; value: string }[];
  noNav?: boolean;
}

export const Layout: React.FunctionComponent<Props> = ({
  children,
  tabs,
  noNav,
}) => {
  const defaultTabValue = tabs && tabs.length > 0 ? tabs[0].value : "";
  const [selectedTab, setSelectedTab] = useState(defaultTabValue);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTabParam = searchParams.get("tab");

  useEffect(() => {
    if (defaultTabValue) {
      if (!selectedTabParam) {
        setSearchParams(`tab=${defaultTabValue}`);
      } else {
        setSelectedTab(selectedTabParam);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSearchParams, selectedTabParam]);

  const handleChangeTab = (tab: string) => {
    setSelectedTab(tab);
    setSearchParams(`tab=${tab}`);
  };

  return (
    <div className={classes.layout}>
      <Header
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={handleChangeTab}
        noNav={noNav}
      />
      <main className={classes.main}>
        {tabs && tabs.length > 0 ? (
          <LayoutTabContext.Provider value={selectedTab}>
            {children}
          </LayoutTabContext.Provider>
        ) : (
          children
        )}
      </main>
    </div>
  );
};
