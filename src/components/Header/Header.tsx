import React, { useEffect } from "react";
import { SessionWallet } from "algorand-session-wallet";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ReactComponent as HomeIcon } from "assets/icons/home.svg";
import { ReactComponent as MarketplaceIcon } from "assets/icons/marketplace.svg";
import { ReactComponent as NFTAuctionsIcon } from "assets/icons/nft-auctions.svg";
import { ReactComponent as NFTStackingIcon } from "assets/icons/nft-stacking.svg";
import { ReactComponent as PortfolioIcon } from "assets/icons/portfolio.svg";
import { ReactComponent as WalletIcon } from "assets/icons/wallet.svg";
import { config } from "common/config/conf";
import { AlgorandWalletConnector } from "components";
import {
  setSessionWallet,
  setAccounts,
  setConnectedStatus,
} from "redux/wallet/wallet-slice";
import classes from "./Header.module.scss";
import { RootState } from "redux/rootReducer";

interface Props {
  className?: string;
  tabs?: { label: string; value: string }[];
  selectedTab?: string;
  onTabChange?: (tab: string) => void;
}

const navItems = [
  {
    label: "Home",
    to: "/",
    icon: <HomeIcon />,
  },
  {
    label: "NFT Staking",
    to: "/nft-staking",
    icon: <NFTStackingIcon />,
  },
  {
    label: "NFT Auctions",
    to: "/nft-auctions",
    icon: <NFTAuctionsIcon />,
  },
  {
    label: "Marketplace",
    to: "/marketplace",
    icon: <MarketplaceIcon />,
  },
  {
    label: "Portfolio",
    to: "/portfolio",
    icon: <PortfolioIcon />,
  },
];

export const Header: React.FunctionComponent<Props> = ({
  className,
  tabs,
  selectedTab,
  onTabChange,
}) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { sessionWallet, accts } = useSelector(
    (state: RootState) => state.wallets
  );

  const sw = new SessionWallet(config.network ? config.network : "TestNet");

  const [connected, setConnected] = React.useState(sw.connected());

  useEffect(() => {
    setConnected(connected);
  }, [connected]);

  const updateWallet = (swk: SessionWallet) => {
    dispatch(setSessionWallet(swk));
    dispatch(setAccounts(swk.accountList()));
    dispatch(setConnectedStatus(swk.connected()));
    setConnected(swk.connected());
  };

  return (
    <header className={classNames(classes.container, className)}>
      <div className={classes.header}>
        <Link to="/" className={classes.logo}>
          THE SOCK<span>VAULT</span>
        </Link>

        <AlgorandWalletConnector
          darkMode={false}
          sessionWallet={sessionWallet}
          accts={accts}
          connected={connected}
          updateWallet={updateWallet}
        />
      </div>

      <div className={classes.navbar}>
        <nav className={classes["page-nav"]}>
          {navItems.map((item) => (
            <NavLink
              to={item.to}
              key={item.label}
              className={({ isActive }) =>
                classNames(
                  classes["page-nav__link"],
                  isActive && classes["page-nav__link--active"]
                )
              }
            >
              {item.icon}
              <span
                className={classNames(
                  classes["page-nav__label"],
                  item.to === pathname && classes["page-nav__label--active"]
                )}
              >
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        {tabs && tabs.length > 0 ? (
          <nav className={classes["tabs-tape"]}>
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => onTabChange?.(tab.value)}
                className={classNames(
                  classes["tabs-tape__item"],
                  selectedTab === tab.value &&
                    classes["tabs-tape__item--active"]
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
};
