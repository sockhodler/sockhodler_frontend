import React, { useState, useEffect } from "react";
import { Layout, Tabs, Tab, NFTGrid } from "components";
import { NftProps } from "components/NFT/NFT";
import classes from "./index.module.scss";
import { getAccountAssets } from "services/AssetService";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/rootReducer";
import { asyncGetMarketplaceRecords } from "redux/wallet/wallet-slice";

const platformAccount = process.env.REACT_APP_PLATFORM_ACCOUNT_ADDRESS;
const sockhodlerAccount = process.env.REACT_APP_GENESIS_COLLECTION_ADDRESS;

export const Marketplace: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetMarketplaceRecords());
  }, []);

  const items: NftProps[] = [];
  for (let i = 0; i < 20; i++) {
    items.push({
      title: "SockHodler 1/250",
      subtitle: "SOCKHODLER",
      price: 125,
      unitMin: 1,
      unitMax: 250,
      unitAvailable: 24,
    });
  }
  const [buyableItems, setBuyableItems] = useState<any>();

  const { selectedAccount, marketplace } = useSelector(
    (state: RootState) => state.wallets
  );
  useEffect(() => {
    const initBuyableAssets = async () => {
      if (platformAccount) {
        const ownedAssetList = (await getAccountAssets(platformAccount)).filter(
          (asset: any) =>
            asset.amount > 0 &&
            asset.decimals === 0 &&
            asset.creator === sockhodlerAccount
        );
        setBuyableItems(ownedAssetList.slice(0, 3));
      }
    };
    if (platformAccount && sockhodlerAccount) {
      initBuyableAssets();
    }
  }, []);

  return (
    <Layout>
      <h2 className={classes.title}>Marketplace</h2>
      <span className={classes.subtitle}>Physically-Backed NFT Socks</span>

      <Tabs
        tabs={[
          {
            label: "Premium Plan",
            value: "premium-plan",
          },
          {
            label: "Genesis Collection",
            value: "genesis-collection",
          },
          {
            label: "Collabs",
            value: "collabs",
          },
        ]}
        mobileSize="small"
      >
        <Tab for="premium-plan">
          <NFTGrid
            back={{ label: "back to home", to: "/" }}
            list={marketplace?.filter((li) => li.amount > 0) ?? []}
            onLoadMoreClick={() => console.log("onLoadMoreClick")}
          />
        </Tab>

        <Tab for="genesis-collection">
          <div className={classes["coming-soon"]}>
            <h2 className={classes["coming-soon__title"]}>
              Genesis NFT Marketplace
            </h2>
            <h3 className={classes["coming-soon__subtitle"]}>Coming Soon</h3>
          </div>
        </Tab>

        <Tab for="collabs">
          <div className={classes["coming-soon"]}>
            <h2 className={classes["coming-soon__title"]}>
              SockBot NFT Marketplace
            </h2>
            <h3 className={classes["coming-soon__subtitle"]}>Coming Soon</h3>
          </div>
        </Tab>
      </Tabs>
    </Layout>
  );
};
