import React, { useEffect, useState } from "react";
import { Button, Card } from "components";
import classes from "./StakingItem.module.scss";
import classNames from "classnames";
import { formatURL } from "utils/helpers";
import loadingBubbleAnimation from "assets/loadings/bubble.svg";

export interface StakingItemProps {
  title: string;
  img: string;
  details: { label: string; value: string }[];
  info: { label: string; value: string }[];
  onClaimRewardsClick?: () => void;
  onWithdrawClick?: (index: number) => void;
  onDepositClick?: (index: number) => void;
  onNftExplorerClick?: () => void;
  onExplorerClick?: () => void;
  type?: "reward" | "deposit";
  depositLoading?: boolean;
  withdrawLoading?: boolean;
}

export const StakingItem: React.FunctionComponent<StakingItemProps> = ({
  title,
  img,
  details,
  info,
  onClaimRewardsClick,
  onWithdrawClick,
  onDepositClick,
  onNftExplorerClick,
  onExplorerClick,
  type = "reward",
  depositLoading,
  withdrawLoading,
}) => {
  const [formattedURL, setFormattedURL] = useState<string>();
  const [loadingFailed, setLoadingFailed] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);

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
            <Button accent="red" sharp onClick={onClaimRewardsClick}>
              CLAIM REWARDS
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
              <Button accent="purple" sharp onClick={onNftExplorerClick}>
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
              <Button accent="black" sharp onClick={onExplorerClick}>
                EXPLORER
              </Button>
            </a>
          </div>
        )}
      </div>
    </Card>
  );
};
