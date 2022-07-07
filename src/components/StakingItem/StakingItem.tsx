import React, { useEffect, useState } from "react";
import { Button, Card } from "components";
import classes from "./StakingItem.module.scss";
import classNames from "classnames";
import { formatURL } from "utils/helpers";
import loadingBubbleAnimation from "assets/loadings/bubble.svg";
import { WalletService } from "services/WalletService";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import ReactTooltip from "react-tooltip";

export interface StakingItemProps {
  title: string;
  img: string;
  details: { label: string; value: string }[];
  info: { label: string; value: string }[];
  onClaimRewardsClick?: (index: number) => void;
  onWithdrawClick?: (index: number) => void;
  onDepositClick?: (index: number) => void;
  // onNftExplorerClick?: () => void;
  // onExplorerClick?: () => void;
  type?: "reward" | "deposit";
  depositLoading?: boolean;
  withdrawLoading?: boolean;
  claimRewardsLoading?: boolean;
  claimRewardsInfoSuccess?: boolean;
}
const platformAccount = process.env.REACT_APP_PLATFORM_ACCOUNT_ADDRESS;
export const StakingItem: React.FunctionComponent<StakingItemProps> = ({
  title,
  img,
  details,
  info,
  onClaimRewardsClick,
  onWithdrawClick,
  onDepositClick,
  // onNftExplorerClick,
  // onExplorerClick,
  type = "reward",
  depositLoading,
  withdrawLoading,
  claimRewardsLoading,
  claimRewardsInfoSuccess,
}) => {
  const [formattedURL, setFormattedURL] = useState<string>();
  const [loadingFailed, setLoadingFailed] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);
  const [disableRewardsBtn, setDisableRewardsBtn] = useState<boolean>(false);
  const [availableDay, setAvailableDay] = useState<number>();

  const { selectedAccount, userInfo } = useSelector(
    (state: RootState) => state.wallets
  );

  useEffect(() => {
    const lastLoginFunc = async (
      username: string,
      fromAddress: string,
      toAddress: string,
      index: number
    ) => {
      const lastLogin = await WalletService.getLastLoginWeeklyClaimRewards(
        username,
        fromAddress,
        toAddress,
        index
      );
      if (lastLogin) {
        const currentTime = new Date();
        const diffTime = currentTime.getTime() - new Date(lastLogin).getTime();
        if (diffTime < 1000 * 60 * 60 * 24) {
          setDisableRewardsBtn(true);
          const availableDay = 7 - Math.floor(diffTime / 1000 / 60 / 60 / 24);
          setAvailableDay(availableDay);
        }
      }
    };

    if (userInfo.username && platformAccount) {
      lastLoginFunc(userInfo.username, selectedAccount, platformAccount, index);
    }
  }, [userInfo, index, claimRewardsInfoSuccess]);

  useEffect(() => {
    if (details.find((de) => de.label === "ASA ID")?.value) {
      setIndex(Number(details.find((de) => de.label === "ASA ID")?.value));
    }
  }, [details]);

  useEffect(() => {
    const formattedURL = async () => {
      const url = await formatURL(img);
      setFormattedURL(url);
    };
    formattedURL();
  }, [img]);
  // const index = details.find((de) => de.label === "ASA ID")?.value;
  return (
    <Card className={classes.container}>
      <div className={classes.header}>{title}</div>

      <div className={classes.row}>
        <div className={classes.column}>
          {imgLoading && (
            <img
              src={loadingBubbleAnimation}
              className={classes.img}
              alt="loading"
            />
          )}
          {loadingFailed ? (
            <video
              preload="auto"
              loop
              autoPlay
              muted
              onLoadStart={() => setImgLoading(false)}
              onError={() => setImgLoading(false)}
              className={`${classes.img} ${imgLoading && classes.hide_img}`}
            >
              <source src={`${formattedURL}#t=0.1`} type="video/mp4" />
            </video>
          ) : (
            <img
              src={formattedURL}
              alt="nft-asset"
              onError={() => setLoadingFailed(true)}
              onLoad={() => setImgLoading(false)}
              className={`${classes.img} ${imgLoading && classes.hide_img}`}
            />
          )}
          {/* <img src={formattedURL} className={classes.img} alt="" /> */}
        </div>
        <div className={classes.divider} />
        <div className={classes.column}>
          <ul className={classes.details}>
            {details.map((detail) => (
              <li className={classes.detail} key={detail.label}>
                <span>{detail.label}:</span>
                <span>{detail.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.divider} />
        <div className={classes.column}>
          {info.map((inf) => (
            <div className={classes.info} key={inf.label}>
              <span>{inf.label}</span>
              <span>{inf.value}</span>
            </div>
          ))}
        </div>
        <div className={classes.divider} />
        {type === "reward" && (
          <div
            className={classNames(classes.column, classes["actions-reward"])}
          >
            <Button
              accent="red"
              sharp
              disabled={claimRewardsLoading || disableRewardsBtn}
              loading={claimRewardsLoading}
              onClick={() => onClaimRewardsClick?.(index)}
              tooltip={
                disableRewardsBtn
                  ? `You can claim in ${availableDay} days.`
                  : ""
              }
            >
              {claimRewardsLoading ? "" : "CLAIM REWARDS"}
            </Button>
            <Button
              accent="purple"
              sharp
              disabled={withdrawLoading}
              loading={withdrawLoading}
              onClick={() => onWithdrawClick?.(index)}
            >
              {withdrawLoading ? "" : "WITHDRAW"}
            </Button>
          </div>
        )}

        {type === "deposit" && (
          <div
            className={classNames(classes.column, classes["actions-deposit"])}
          >
            <Button
              accent="red"
              sharp
              disabled={depositLoading}
              loading={depositLoading}
              onClick={() => onDepositClick?.(index)}
            >
              {depositLoading ? "" : "Deposit NFT"}
            </Button>
            <a
              href={`https://nftexplorer.app/asset/${
                details.find((de) => de.label === "ASA ID")?.value
              }`}
              target="_blank"
              rel="noreferrer"
            >
              <Button accent="purple" sharp>
                NFTEXPLORER
              </Button>
            </a>
            <a
              href={`https://algoexplorer.io/asset/${
                details.find((de) => de.label === "ASA ID")?.value
              }`}
              target="_blank"
              rel="noreferrer"
            >
              <Button accent="black" sharp>
                EXPLORER
              </Button>
            </a>
          </div>
        )}
      </div>
      <ReactTooltip effect="solid" place="bottom" className={classes.tooltip} />
    </Card>
  );
};
