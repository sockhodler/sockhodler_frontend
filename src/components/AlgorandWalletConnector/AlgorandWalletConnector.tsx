import React, { useEffect, useState } from "react";
import {
  Dialog,
  Button,
  Classes,
  Menu,
  Popover,
  Position,
} from "@blueprintjs/core";
import { SessionWallet, allowedWallets } from "algorand-session-wallet";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as WalletIcon } from "assets/icons/wallet.svg";
import { ReactComponent as ChevronDownIcon } from "assets/icons/chevron-down.svg";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import { formatAddress } from "common/helper/FormatAddress";
import { ConnectWalletModal } from "components";
import { RootState } from "redux/rootReducer";
import { setSelectedAccount } from "redux/wallet/wallet-slice";
import classes from "./AlgorandWalletConnector.module.scss";

interface WalletDropdownProps {
  selected: string;
  items: { label: string; value: string }[];
  onClickItem?: (idx: number, id: string) => void;
}

const WalletDropdown: React.FunctionComponent<WalletDropdownProps> = ({
  selected,
  items,
  onClickItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const hanleClickOnItem = (idx: number, value: string) => {
    onClickItem?.(idx, value);
    setIsOpen(false);
  };

  return (
    <div
      className={classNames(
        classes.dropdown,
        isOpen && classes["dropdown--open"]
      )}
    >
      <button
        className={classes.dropdown__select}
        onClick={() => setIsOpen((op) => !op)}
      >
        {selected}... <ChevronDownIcon />
      </button>
      <div className={classes.dropdown__list}>
        {items.map((item, idx) => (
          <button
            className={classes.dropdown__item}
            key={item.value}
            onClick={() => hanleClickOnItem(idx, item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

type AlgorandWalletConnectorProps = {
  darkMode: boolean;
  connected: boolean;
  accts: string[];
  sessionWallet: SessionWallet;
  updateWallet(sw: SessionWallet): void;
};

export const AlgorandWalletConnector: React.FunctionComponent<
  AlgorandWalletConnectorProps
> = ({ sessionWallet, updateWallet, darkMode, connected, accts }) => {
  const dispatch = useDispatch();

  const selectedWallet = useSelector(
    (state: RootState) => state.wallets?.selectedAccount
  );
  const [selectorOpen, setSelectorOpen] = useState(false);

  useEffect(() => {
    if (accts && accts?.length > 0 && !accts.includes(selectedWallet)) {
      dispatch(setSelectedAccount(accts[0]));
    }
  }, [accts]);

  useEffect(() => {
    if (sessionWallet.connected()) return;

    let interval: any;
    sessionWallet.connect().then((success) => {
      if (!success) return;

      // Check every 500ms to see if we've connected then kill the interval
      // This is most useful in the case of walletconnect where it may be several
      // seconds before the user connects
      interval = setInterval(() => {
        if (sessionWallet.connected()) {
          clearInterval(interval);
          updateWallet(sessionWallet);
        }
      }, 500);
    });

    return () => {
      clearInterval(interval);
    };
  }, [sessionWallet, updateWallet]);

  const disconnectWallet = () => {
    localStorage.removeItem("selectedAccount");
    dispatch(setSelectedAccount(""));
    sessionWallet.disconnect();
    updateWallet(
      new SessionWallet(sessionWallet.network, sessionWallet.permissionCallback)
    );
  };

  const handleSelectedWallet = async (id: string) => {
    if (!(id in allowedWallets)) {
      if (sessionWallet.wallet !== undefined) sessionWallet.disconnect();
      return setSelectorOpen(false);
    }

    const sw = new SessionWallet(
      sessionWallet.network,
      sessionWallet.permissionCallback,
      id
    );

    if (!(await sw.connect())) {
      sw.disconnect();
    }

    updateWallet(sw);

    setSelectorOpen(false);
  };

  const walletOptions = [];
  const myAlgoOption = Object.entries(allowedWallets).find(
    (w) => w[0] === "my-algo-connect"
  );
  if (myAlgoOption) {
    walletOptions.push({
      icon: myAlgoOption[1].img(darkMode),
      label: myAlgoOption[1].displayName(),
      id: myAlgoOption[0],
    });
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const [k, v] of Object.entries(allowedWallets).filter(
    (w) => w[0] !== "my-algo-connect"
  )) {
    walletOptions.push({
      icon: v.img(darkMode),
      label: v.displayName(),
      id: k,
    });
  }

  if (!connected)
    return (
      <>
        <button
          className={classes.wallet}
          onClick={() => setSelectorOpen(true)}
        >
          <span className={classes.wallet__text}>Connect Wallet</span>
          <div className={classes.wallet__btn}>
            <WalletIcon />
          </div>
        </button>

        <ConnectWalletModal
          isOpen={selectorOpen}
          onClose={() => setSelectorOpen(false)}
          wallets={walletOptions}
          onWalletClick={handleSelectedWallet}
        />
      </>
    );

  const handleWalletChange = (index: number, addr: string) => {
    dispatch(setSelectedAccount(addr));
    sessionWallet.setAccountIndex(index);
    updateWallet(sessionWallet);
  };

  const hadleGoClick = (addr: string) => {
    console.log("addr", addr);
    // history.push(`/creators/${addr}`)
  };

  return (
    <div className={classes.connected}>
      <WalletDropdown
        selected={formatAddress(selectedWallet.toString())}
        items={accts.map((acc) => ({ label: formatAddress(acc), value: acc }))}
        onClickItem={(idx, addr) => handleWalletChange(idx, addr)}
      />
      <button className={classes.connected__logout}>
        <LogoutIcon />
      </button>
      {/* <div className={classes['wallets-container']}>
        <Popover
          minimal
          position={Position.BOTTOM}
          className={classes['wallet-popover']}
        >
          <Button
            text={formatAddress(selectedWallet.toString())}
            className={classes['wallets-dropdown']}
            rightIcon="symbol-circle"
            intent="success"
          />
          <div className={classes['popover-content']}>
            {accts.map((addr, idx) => (
              <Menu
                // text={addr}
                key={idx}
                onClick={() => handleWalletChange(idx, addr)}
                className={classNames(
                  classes.walletMenu,
                  addr === selectedWallet && classes.blueGlowText,
                )}
              >
                {formatAddress(addr)}
                <Button
                  icon="arrow-right"
                  minimal
                  onClick={() => hadleGoClick(addr)}
                  className={classes.linkTo}
                />
              </Menu>
            ))}
          </div>
        </Popover>
        <Button
          icon="log-out"
          minimal
          onClick={disconnectWallet}
          className={classNames(
            classes.buttonPink,
            classes.noOutline,
            classes.disconnect,
          )}
        />
      </div> */}
    </div>
  );
};
