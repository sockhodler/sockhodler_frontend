import React, { useEffect, useState } from "react";
import { Layout, NFTMarketplaceDetails, TokenTxnModal } from "components";
import {
  sendTokenInfoType,
  MarketplaceItemDetailsType,
  MarketplaceItemInfoType,
} from "components/NFTMarketplaceDetails/NFTMarketplaceDetails";
import classes from "./index.module.scss";
import { ReactComponent as AlgoIcon } from "assets/icons/algo.svg";
import { RootState } from "redux/rootReducer";
import {
  asyncGetMarketplaceRecords,
  asyncUpdateMarketplaceRecords,
  setModalStep,
} from "redux/wallet/wallet-slice";
import { useSelector, useDispatch } from "react-redux";
import {
  sendSOCKSTokenFromUserToPlatformAccount,
  sendALGOTokenFromUserToPlatformAccount,
} from "utils/algorand";
import { useParams } from "react-router-dom";
import { MarketplaceItemType } from "components/NFT/NFT";

const platformAccountAddress = process.env.REACT_APP_PLATFORM_ACCOUNT_ADDRESS;

export const MarketplaceDetails: React.FunctionComponent = () => {
  const { index } = useParams();
  const [selectedMarketplace, setSelectedMarketplace] =
    useState<MarketplaceItemType>();
  const [marketplaceItemDetails, setMarketplaceItemDetails] =
    useState<MarketplaceItemDetailsType[]>();
  const [marketplaceItemInfo, setMarketplaceItemInfo] =
    useState<MarketplaceItemInfoType[]>();

  const [sendTokenInfo, setSendTokenInfo] = useState<sendTokenInfoType>({
    loading: false,
    txId: "",
    amount: undefined,
    success: false,
  });
  const [selectedPay, setSelectedPay] = useState("");

  const dispatch = useDispatch();
  const { connected, selectedAccount, sessionWallet, marketplace } =
    useSelector((state: RootState) => state.wallets);

  useEffect(() => {
    dispatch(asyncGetMarketplaceRecords());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendTokenInfo.success]);
  useEffect(() => {
    if (index && marketplace) {
      const selectedItem = marketplace.find((li) => li.index === Number(index));
      if (selectedItem) {
        setSelectedMarketplace(selectedItem);
        const infoItems: MarketplaceItemInfoType[] = [
          {
            title: "Price",
            value: (
              <span>
                {selectedItem?.algoPrice}
                <AlgoIcon />
              </span>
            ),
          },
          {
            title: "Quantity Remaining",
            value: "Coming Soon",
          },
          {
            title: "Total Minted",
            value: selectedItem.total.toString(),
          },
          {
            value:
              selectedItem.description ??
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed ",
          },
        ];
        setMarketplaceItemInfo(infoItems);

        const details: MarketplaceItemDetailsType[] = [
          {
            name: "Asset ID",
            value: selectedItem.index.toString(),
            to: `https://algoexplorer.io/asset/${selectedItem.index}`,
          },
          // {
          //   name: "App ID",
          //   value: "6112547",
          //   to: "/",
          // },
          {
            name: "Royalty",
            value: `${selectedItem.royalty}`,
            to: `https://algoexplorer.io/asset/${selectedItem.index}`,
          },
          {
            name: "Creator",
            value: selectedItem.creator,
            to: `https://algoexplorer.io/address/${selectedItem.creator}`,
          },
        ];
        setMarketplaceItemDetails(details);
      }
    }
  }, [index, marketplace]);

  // useEffect(() => {

  // }, [selectedMarketplace])
  const handleBuyNowClick = async () => {
    if (connected && selectedAccount) {
      setSendTokenInfo({
        ...sendTokenInfo,
        loading: true,
        amount: 0,
      });
      if (
        platformAccountAddress &&
        sessionWallet &&
        selectedMarketplace &&
        selectedMarketplace.index &&
        selectedMarketplace.amount &&
        selectedMarketplace.creator &&
        selectedMarketplace.url
      ) {
        let amount;
        try {
          if (selectedPay === "socks-tokens") {
            amount = selectedMarketplace.socksPrice ?? 0;
            await sendSOCKSTokenFromUserToPlatformAccount(
              sessionWallet.wallet,
              selectedAccount,
              platformAccountAddress,
              amount,
              selectedMarketplace.index,
              setSendTokenInfo
            );
          } else if (selectedPay === "algo") {
            amount = selectedMarketplace.algoPrice ?? 0;
            await sendALGOTokenFromUserToPlatformAccount(
              sessionWallet.wallet,
              selectedAccount,
              platformAccountAddress,
              amount,
              selectedMarketplace.index,
              setSendTokenInfo
            );
          }
          dispatch(
            asyncUpdateMarketplaceRecords({
              name: selectedMarketplace.name,
              unitName: selectedMarketplace.unitName,
              creator: selectedMarketplace.creator,
              index: selectedMarketplace.index,
              url: selectedMarketplace.url,
              amount: selectedMarketplace.amount - 1,
            })
          );
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
      {selectedMarketplace && marketplaceItemDetails && marketplaceItemInfo && (
        <NFTMarketplaceDetails
          back={{ label: "back to home", to: "/" }}
          actionLabel="BUY NOW"
          onActionClick={handleBuyNowClick}
          detailInfo={selectedMarketplace}
          details={marketplaceItemDetails}
          info={marketplaceItemInfo}
          sendTokenInfo={sendTokenInfo}
          selectedPay={selectedPay}
          setSelectedPay={setSelectedPay}
        />
      )}
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
