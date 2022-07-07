import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "assets/icons/arrow-right.svg";
import { Card, NFTInfo, Button, Select, LoadingIndicator } from "components";
import classes from "./NFTMarketplaceDetails.module.scss";
import classNames from "classnames";
import { MarketplaceItemType } from "components/NFT/NFT";
import { formatURL } from "utils/helpers";
import loadingBubbleAnimation from "assets/loadings/bubble.svg";

const paySelectItems = [
  {
    label: "SOCKS Tokens",
    value: "socks-tokens",
  },
  {
    label: "ALGO",
    value: "algo",
  },
];

export interface sendTokenInfoType {
  loading: boolean;
  txId: string;
  amount: number | undefined;
  success: boolean;
}
export interface MarketplaceItemDetailsType {
  name: string;
  value: string;
  to: string;
}

export interface MarketplaceItemInfoType {
  title?: string;
  value: string | JSX.Element;
}
interface Props {
  back: { label: string; to: string };
  detailInfo: MarketplaceItemType;
  details: MarketplaceItemDetailsType[];
  info: MarketplaceItemInfoType[];
  actionLabel: string;
  onActionClick: () => void;
  sendTokenInfo: sendTokenInfoType;
  selectedPay: string;
  setSelectedPay: any;
}

export const NFTMarketplaceDetails: React.FunctionComponent<Props> = ({
  back,
  detailInfo,
  details,
  info,
  actionLabel,
  onActionClick,
  sendTokenInfo,
  selectedPay,
  setSelectedPay,
}) => {
  const [formattedURL, setFormattedURL] = useState<string>();
  const [loadingFailed, setLoadingFailed] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState<boolean>(true);

  useEffect(() => {
    const formattedURL = async () => {
      if (detailInfo.url) {
        const url = await formatURL(detailInfo.url);
        setFormattedURL(url);
      }
    };
    formattedURL();
  }, [detailInfo.url]);

  return (
    <div className={classes.container}>
      <div className={classes.nav}>
        <Link to={back.to}>
          <ArrowRightIcon />
          <span>{back.label}</span>
        </Link>
      </div>

      <Card className={classes.nft}>
        <div
          className={classes.header}
        >{`${detailInfo.name} ${detailInfo.amount}/${detailInfo.total}`}</div>

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
        {/* <img src={imgSrc} alt="" className={classes.img} /> */}

        <div className={classes.actions}>
          <Button
            size="large"
            accent="red"
            onClick={onActionClick}
            disabled={
              selectedPay.length === 0 ||
              sendTokenInfo.loading ||
              detailInfo.amount === 0
            }
            className={classNames(
              selectedPay.length === 0 && classes["actions__cta--disabled"]
            )}
          >
            {sendTokenInfo.loading ? (
              <LoadingIndicator fontSize={20} />
            ) : (
              actionLabel
            )}
          </Button>

          <Select
            selected={selectedPay}
            items={paySelectItems}
            onChange={(item: any) => setSelectedPay(item.value)}
            className={classes.actions__select}
            placeholder="Select your currency"
            accent="violet"
            label="Pay With"
          />
        </div>

        <Card className={classes.info}>
          {info.map((item, index) => (
            <div key={index} className={classes.info__item}>
              {item.title ? (
                <>
                  <span>{item.title}</span>
                  {typeof item.value === "string" ? (
                    <span>{item.value}</span>
                  ) : (
                    item.value
                  )}
                </>
              ) : (
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                  aliquip ex ea commodo consequat.
                </p>
              )}
            </div>
          ))}
        </Card>

        <div className={classes.details}>
          {details.map((detail, index) => (
            <NFTInfo
              key={index}
              name={detail.name}
              value={detail.value}
              to={detail.to}
              size="small"
            />
          ))}
        </div>
      </Card>
    </div>
  );
};
