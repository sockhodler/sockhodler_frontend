import React, { useState } from "react";
import { Layout, NFTMarketplaceDetails, TokenTxnModal } from "components";
import { sendTokenInfoType } from "components/NFTMarketplaceDetails/NFTMarketplaceDetails";
import classes from "./index.module.scss";
import { ReactComponent as AlgoIcon } from "assets/icons/algo.svg";
import { RootState } from "redux/rootReducer";
import { setModalStep } from "redux/wallet/wallet-slice";
import { useSelector, useDispatch } from "react-redux";
import {
  sendSOCKSTokenFromUserToPlatformAccount,
  sendALGOTokenFromUserToPlatformAccount,
} from "utils/algorand";

const infoItems = [
  {
    title: "Price",
    value: (
      <span>
        125
        <AlgoIcon />
      </span>
    ),
  },
  {
    title: "Quantity Remaining",
    value: "50",
  },
  {
    title: "Total Minted",
    value: "250",
  },
  {
    value: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed ",
  },
];

const details = [
  {
    name: "Asset ID",
    value: "545366852",
    to: "/",
  },
  {
    name: "App ID",
    value: "6112547",
    to: "/",
  },
  {
    name: "Royalty",
    value: "5%",
    to: "/",
  },
  {
    name: "Creator",
    value: "SOCKSV3AE5R4BS5...",
    to: "/",
  },
];

const platformAccountAddress = process.env.REACT_APP_PLATFORM_ACCOUNT_ADDRESS;

export const MarketplaceDetails: React.FunctionComponent = () => {
  const [sendTokenInfo, setSendTokenInfo] = useState<sendTokenInfoType>({
    loading: false,
    txId: "",
    amount: undefined,
    success: false,
  });
  const [selectedPay, setSelectedPay] = useState("");

  const dispatch = useDispatch();
  const { connected, selectedAccount, sessionWallet } = useSelector(
    (state: RootState) => state.wallets
  );
  const handleBuyNowClick = async () => {
    if (connected && selectedAccount) {
      setSendTokenInfo({
        ...sendTokenInfo,
        loading: true,
        amount: 1,
      });
      if (platformAccountAddress && sessionWallet) {
        try {
          if (selectedPay === "socks-tokens") {
            await sendSOCKSTokenFromUserToPlatformAccount(
              sessionWallet.wallet,
              selectedAccount,
              platformAccountAddress,
              1,
              setSendTokenInfo
            );
          } else if (selectedPay === "algo") {
            await sendALGOTokenFromUserToPlatformAccount(
              sessionWallet.wallet,
              selectedAccount,
              platformAccountAddress,
              1,
              setSendTokenInfo
            );
          }
        } catch (err) {
          setSendTokenInfo({
            loading: false,
            txId: "",
            amount: undefined,
            success: false,
          });
        }
      } else {
        setSendTokenInfo({
          loading: false,
          txId: "",
          amount: undefined,
          success: false,
        });
      }
    } else {
      dispatch(setModalStep(1));
    }
  };

  return (
    <Layout>
      <h2 className={classes.title}>Marketplace</h2>
      <span className={classes.subtitle}>NFT</span>

      <NFTMarketplaceDetails
        back={{ label: "back to home", to: "/" }}
        title="SockHolder 1/250"
        imgSrc="https://unsplash.it/700/700"
        actionLabel="BUY NOW"
        onActionClick={handleBuyNowClick}
        info={infoItems}
        details={details}
        sendTokenInfo={sendTokenInfo}
        selectedPay={selectedPay}
        setSelectedPay={setSelectedPay}
      />
      <TokenTxnModal
        isOpen={sendTokenInfo.success}
        onClose={() =>
          setSendTokenInfo({
            ...sendTokenInfo,
            success: false,
          })
        }
        title="Payment Transaction"
        subtitle="Confirmed"
        currency={selectedPay}
        data={sendTokenInfo}
        addr={selectedAccount}
      />
    </Layout>
  );
};
