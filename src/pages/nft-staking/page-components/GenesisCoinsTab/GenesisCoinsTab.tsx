/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lonely-if */
import React, { useEffect, useState } from "react";

import {
  AlgorandWalletConnector,
  Button,
  StakingItem,
  Switch,
  Tab,
  TextField,
} from "components";
import { StakingItemProps } from "components/StakingItem/StakingItem";
import classes from "./GenesisCoinsTab.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/rootReducer";
import { SessionWallet } from "algorand-session-wallet";
import { config } from "common/config/conf";
import {
  setSessionWallet,
  setAccounts,
  setConnectedStatus,
  asyncSetStakeRecords,
  asyncDeleteStakeRecords,
  WalletLoadingId,
} from "redux/wallet/wallet-slice";
import { getAccountAssets } from "services/AssetService";
import { NFT } from "utils/nft";
import {
  optInPlatformAccountAsset,
  optInUserAccountAsset,
  transferAssetFromUserToPlatformAccount,
  transferAssetFromPlatformAccountToUser,
} from "utils/algorand";
import { WalletService } from "services/WalletService";

interface Props {
  for: string;
}
interface DepositLoadingType {
  status: boolean;
  index: number | undefined;
}
interface WithdrawLoadingType {
  status: boolean;
  index: number | undefined;
}

export const GenesisCoinsTab: React.FC<Props> = ({ for: tabFor }) => {
  const [isStaked, setIsStaked] = useState<boolean>(true);
  const [fetchMoreLoading, setFetchMoreLoading] = useState<boolean>(false);
  const [depositLoading, setDepositLoading] = useState<DepositLoadingType>({
    status: false,
    index: undefined,
  });
  const [withdrawLoading, setWithdrawLoading] = useState<WithdrawLoadingType>({
    status: false,
    index: undefined,
  });

  const [totalAssets, setTotalAssets] = useState<any>([]);
  const [totalStakedAssets, setTotalStakedAssets] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [hasMoreStaked, setHasMoreStaked] = useState<boolean>(false);
  const [assetDepositList, setAssetDepositList] = useState<any>([]);
  const [assetStakedList, setAssetStakedList] = useState<any>([]);

  const dispatch = useDispatch();

  const isConnected = useSelector(
    (state: RootState) => state.wallets?.connected
  );

  const { sessionWallet, accts, selectedAccount, userInfo, loading } =
    useSelector((state: RootState) => state.wallets);

  const sw = new SessionWallet(config.network ? config.network : "TestNet");
  const [connected, setConnected] = React.useState(sw.connected());

  const platformAccount = process.env.REACT_APP_PLATFORM_ACCOUNT_ADDRESS;

  const updateWallet = (swk: SessionWallet) => {
    dispatch(setSessionWallet(swk));
    dispatch(setAccounts(swk.accountList()));
    dispatch(setConnectedStatus(swk.connected()));
    setConnected(swk.connected());
  };

  useEffect(() => {
    setConnected(connected);
  }, [connected]);

  // const rewardsItems: StakingItemProps[] = [];
  // const depositItems: StakingItemProps[] = [];
  const [depositItems, setDepositItems] = useState<StakingItemProps[]>([]);
  const [rewardsItems, setRewardsItems] = useState<StakingItemProps[]>([]);

  useEffect(() => {
    const initTotalAssets = async () => {
      const ownedAssetList = (await getAccountAssets(selectedAccount)).filter(
        (asset: any) => asset.amount > 0 && asset.decimals === 0
      );
      setTotalAssets(ownedAssetList);
    };
    const initStakedAssets = async () => {
      const { data } = await WalletService.getStakeRecords(selectedAccount);
      setTotalStakedAssets(data);
    };
    if (
      depositLoading.status === false &&
      !loading.includes(WalletLoadingId.SET_STAKE_RECORDS) &&
      isStaked
    ) {
      setTimeout(initTotalAssets, 500);
    }
    if (
      withdrawLoading.status === false &&
      !loading.includes(WalletLoadingId.DELETE_STAKE_RECORDS) &&
      !isStaked
    ) {
      setTimeout(initStakedAssets, 500);
    }
  }, [
    sessionWallet,
    selectedAccount,
    isStaked,
    withdrawLoading,
    depositLoading,
    loading,
  ]);

  useEffect(() => {
    if (!isStaked) {
      if (totalStakedAssets.length > 0) {
        setHasMoreStaked(true);
        fetchNextBlock([], 0, 3);
      } else {
        setAssetStakedList([]);
        setHasMoreStaked(false);
      }
    } else {
      if (totalAssets.length > 0) {
        setHasMore(true);
        fetchNextBlock([], 0, 3);
      } else {
        setAssetDepositList([]);
        setHasMore(false);
      }
    }
  }, [totalAssets, totalStakedAssets, isStaked]);

  const fetchMoreAssets = (
    assets: any[],
    originAssets: any[],
    from: number,
    to: number
  ) => {
    setFetchMoreLoading(true);
    if (from >= assets.length) {
      if (!isStaked) {
        setHasMoreStaked(false);
      } else {
        setHasMore(false);
      }
      setFetchMoreLoading(false);
      return;
    }
    if (!isStaked) {
      const getAssetsPromises = [...assets.slice(from, to)].map((asset) =>
        NFT.tokenFromAssetId(asset.index)
      );
      Promise.all(getAssetsPromises).then(async (list: any) => {
        setAssetStakedList([
          ...originAssets,
          ...list
            .filter((e: any) => !!e)
            .map((token: any) => ({
              ...token,
              index: token.id,
            })),
        ]);
        setFetchMoreLoading(false);
      });
    } else {
      const getAssetsPromises = [...assets.slice(from, to)].map((asset) =>
        NFT.tokenFromAssetId(asset["asset-id"])
      );
      Promise.all(getAssetsPromises).then(async (list: any) => {
        setAssetDepositList([
          ...originAssets,
          ...list
            .filter((e: any) => !!e)
            .map((token: any) => ({
              ...token,
              index: token.id,
            })),
        ]);
        setFetchMoreLoading(false);
      });
    }
  };

  const fetchNextBlock = (originAssets: any[], from: number, to: number) => {
    if (!isStaked) {
      if (totalStakedAssets.length > 0) {
        fetchMoreAssets(totalStakedAssets, originAssets, from, to);
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (totalAssets.length > 0) {
        fetchMoreAssets(totalAssets, originAssets, from, to);
      }
    }
  };

  const handleDepositClick = async (index: number) => {
    setDepositLoading({
      status: true,
      index,
    });
    const amount = 1;
    if (platformAccount) {
      try {
        const optInResult = await optInPlatformAccountAsset(
          platformAccount,
          index
        );
        if (optInResult) {
          const transferResult = await transferAssetFromUserToPlatformAccount(
            sw.wallet,
            selectedAccount,
            platformAccount,
            amount,
            index
          );
          if (transferResult) {
            dispatch(
              asyncSetStakeRecords({
                username: userInfo.username || "",
                fromAddress: selectedAccount,
                toAddress: platformAccount,
                index,
                amount,
              })
            );
          }
        }
      } catch (error) {
        console.error(error);
        setDepositLoading({
          status: false,
          index,
        });
      }
    }
    setDepositLoading({
      status: false,
      index,
    });
  };

  const handleWithdrawClick = async (index: number) => {
    setWithdrawLoading({
      status: true,
      index,
    });
    const amount = 1;
    if (platformAccount) {
      try {
        const optInResult = await optInUserAccountAsset(
          sw.wallet,
          selectedAccount,
          index
        );
        if (optInResult) {
          const transferResult = await transferAssetFromPlatformAccountToUser(
            platformAccount,
            selectedAccount,
            amount,
            index
          );
          if (transferResult) {
            dispatch(
              asyncDeleteStakeRecords({
                fromAddress: selectedAccount,
                index,
                amount,
              })
            );
          }
        }
      } catch (error) {
        console.error(error);
        setWithdrawLoading({
          status: false,
          index,
        });
      }
    }
    setWithdrawLoading({
      status: false,
      index,
    });
  };

  useEffect(() => {
    if (totalAssets.length <= assetDepositList.length) {
      setHasMore(false);
    }
    const depositItemsArr = [];
    for (let index = 0; index < assetDepositList.length; index++) {
      const element = assetDepositList[index];
      depositItemsArr.push({
        title: element.name,
        img: element.url,
        details: [
          {
            label: "ASA ID",
            value: element.id,
          },
          {
            label: "Amount Held",
            value: "0",
          },
          {
            label: "Amount Staked",
            value: "1",
          },
        ],
        info: [
          {
            label: "Deposit NFT",
            value: "to earn weekly rewards",
          },
          {
            label: "Estimated APY",
            value: "10.41%",
          },
        ],
        onDepositClick: (index: number) => handleDepositClick(index),
        onNftExplorerClick: () => console.log("onNftExplorerClick"),
        onExplorerClick: () => console.log("onExplorerClick"),
      });
    }
    setDepositItems(depositItemsArr);
  }, [assetDepositList]);
  useEffect(() => {
    if (totalStakedAssets.length <= assetStakedList.length) {
      setHasMoreStaked(false);
    }
    const stakedItemsArr = [];
    for (let index = 0; index < assetStakedList.length; index++) {
      const element = assetStakedList[index];
      stakedItemsArr.push({
        title: element.name,
        img: element.url,
        details: [
          {
            label: "ASA ID",
            value: element.id,
          },
          {
            label: "Amount Held",
            value: "0",
          },
          {
            label: "Amount Staked",
            value: "1",
          },
        ],
        info: [
          {
            label: "Estimated Daily Rewards",
            value: "15 SOCKS Tokens",
          },
          {
            label: "Estimated APY",
            value: "10.41%",
          },
        ],
        onClaimRewardsClick: () => console.log("onClaimRewardsClick"),
        onWithdrawClick: (index: number) => handleWithdrawClick(index),
      });
    }
    setRewardsItems(stakedItemsArr);
  }, [assetStakedList]);

  const handleHasMoreClick = () => {
    if (!isStaked) {
      fetchNextBlock(
        assetStakedList,
        assetStakedList.length,
        assetStakedList.length + 3
      );
    } else {
      fetchNextBlock(
        assetDepositList,
        assetDepositList.length,
        assetDepositList.length + 3
      );
    }
  };
  return (
    <Tab for={tabFor}>
      {isConnected ? (
        <div className={classes.grid}>
          <div className={classes.header}>
            <TextField
              placeholder="SEARCH"
              className={classes.header__search}
              underline
            />
            <Switch
              label="STAKED"
              isActive={isStaked}
              onChange={(ia) => setIsStaked(ia)}
            />
          </div>

          <div className={classes.list}>
            {!isStaked
              ? rewardsItems.map((item: any, index) => (
                  <StakingItem
                    key={index}
                    {...item}
                    type="reward"
                    withdrawLoading={
                      withdrawLoading.index ===
                      item.details.find((de: any) => de.label === "ASA ID")
                        .value
                        ? withdrawLoading.status
                        : undefined
                    }
                  />
                ))
              : depositItems.map((item: any, index) => (
                  <StakingItem
                    key={index}
                    {...item}
                    type="deposit"
                    depositLoading={
                      depositLoading.index ===
                      item.details.find((de: any) => de.label === "ASA ID")
                        .value
                        ? depositLoading.status
                        : undefined
                    }
                  />
                ))}
          </div>
          {!isStaked ? (
            <Button
              size="huge"
              disabled={!hasMoreStaked}
              className={`${classes["load-more"]} ${
                !hasMoreStaked && classes["load-more--disabled"]
              }`}
              loading={fetchMoreLoading}
              onClick={handleHasMoreClick}
            >
              {fetchMoreLoading ? "" : "LOAD MORE..."}
            </Button>
          ) : (
            <Button
              size="huge"
              disabled={!hasMore}
              className={`${classes["load-more"]} ${
                !hasMore && classes["load-more--disabled"]
              }`}
              loading={fetchMoreLoading}
              onClick={handleHasMoreClick}
            >
              {fetchMoreLoading ? "" : "LOAD MORE..."}
            </Button>
          )}
        </div>
      ) : (
        <div className={classes["connect-wallet"]}>
          <AlgorandWalletConnector
            darkMode={false}
            sessionWallet={sessionWallet}
            accts={accts}
            connected={connected}
            updateWallet={updateWallet}
            className={classes["connect-wallet__btn"]}
          />
        </div>
      )}
    </Tab>
  );
};
