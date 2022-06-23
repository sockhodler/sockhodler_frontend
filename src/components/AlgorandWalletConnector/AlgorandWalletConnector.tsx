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
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as WalletIcon } from "assets/icons/wallet.svg";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import { formatAddress } from "common/helper/FormatAddress";
import { ConnectWalletModal, LoadingModal, Select } from "components";
import { RootState } from "redux/rootReducer";
import {
  setSelectedAccount,
  asyncCheckUser,
  setModalStep,
  setLoginSuccess,
  WalletLoadingId,
} from "redux/wallet/wallet-slice";
import classes from "./AlgorandWalletConnector.module.scss";
import classNames from "classnames";

type AlgorandWalletConnectorProps = {
  darkMode: boolean;
  connected: boolean;
  accts: string[];
  sessionWallet: SessionWallet;
  updateWallet(sw: SessionWallet): void;
  className?: string;
};

export const AlgorandWalletConnector: React.FunctionComponent<
  AlgorandWalletConnectorProps
> = ({
  sessionWallet,
  updateWallet,
  darkMode,
  connected,
  accts,
  className,
}) => {
  const dispatch = useDispatch();

  const selectedWallet = useSelector(
    (state: RootState) => state.wallets?.selectedAccount
  );
  const isConnected = useSelector(
    (state: RootState) => state.wallets?.connected
  );
  const { modalStep, loginSuccess, loading } = useSelector(
    (state: RootState) => state.wallets
  );

  const [selectorOpen, setSelectorOpen] = useState(false);

  useEffect(() => {
    if (modalStep !== 0) {
      setSelectorOpen(true);
    } else {
      setSelectorOpen(false);
    }
  }, [modalStep, loginSuccess]);
  useEffect(() => {
    if (isConnected && selectedWallet) {
      dispatch(
        asyncCheckUser({
          publicAddress: selectedWallet,
        })
      );
    }
  }, [isConnected, selectedWallet]);

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
    dispatch(setModalStep(0));
    dispatch(setLoginSuccess(false));
  };

  const handleSelectedWallet = async (id: string) => {
    if (!(id in allowedWallets)) {
      if (sessionWallet.wallet !== undefined) sessionWallet.disconnect();
      return dispatch(setModalStep(0));
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

    dispatch(setModalStep(0));
  };

  const handleConnectWalletClick = () => {
    dispatch(setModalStep(1));
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

  if (!loginSuccess)
    return (
      <>
        <button
          className={classNames(classes.wallet, className)}
          onClick={handleConnectWalletClick}
        >
          <span className={classes.wallet__text}>Connect Wallet</span>
          <div className={classes.wallet__btn}>
            <WalletIcon />
          </div>
        </button>
        <ConnectWalletModal
          isOpen={selectorOpen}
          // onClose={() => setSelectorOpen(false)}
          // wallets={walletOptions}
          onWalletClick={handleSelectedWallet}
          step={modalStep}
        />

        <LoadingModal
          isOpen={loading.includes(WalletLoadingId.CHECK_USER)}
          onClose={() => console.log("false")}
        />
      </>
    );

  const handleWalletChange = (index: number, addr: string) => {
    dispatch(setSelectedAccount(addr));
    sessionWallet.setAccountIndex(index);
    updateWallet(sessionWallet);
  };

  return (
    <div className={classes.connected}>
      <Select
        selected={selectedWallet.toString()}
        items={accts.map((acc) => ({ label: formatAddress(acc), value: acc }))}
        onChange={(item, idx) => handleWalletChange(idx, item.value)}
        className={classes.connected__select}
      />

      <button className={classes.connected__logout} onClick={disconnectWallet}>
        <LogoutIcon />
      </button>
    </div>
  );
};
