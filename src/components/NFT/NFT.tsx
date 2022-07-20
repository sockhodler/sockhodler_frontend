import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as AlgoIcon } from "assets/icons/algo.svg";
import { Card, Button } from "components";
import classes from "./NFT.module.scss";
import { formatURL } from "utils/helpers";
import loadingBubbleAnimation from "assets/loadings/bubble.svg";

export interface NftProps {
  title: string;
  subtitle: string;
  price?: number;
  unitMin?: number;
  unitMax?: number;
  unitAvailable?: number;
  currentBid?: number;
  endIn?: number;
  type?: "portfolio";
  info?: { label: string; value: string }[];
}

export interface MarketplaceItemType {
  name: string;
  unitName: string;
  creator?: string;
  index?: number;
  amount?: number;
  total?: number;
  decimals?: number;
  url?: string;
  algoPrice?: number;
  socksPrice?: number;
  royalty?: number;
  type?: string;
  currentBid?: number;
  endIn?: number;
  info?: { label: string; value: string }[];
  description?: string;
}

export const NFT: React.FunctionComponent<MarketplaceItemType> = ({
  name,
  unitName,
  creator,
  index,
  amount,
  total,
  decimals,
  url,
  algoPrice,
  socksPrice,
  royalty,
  type,
  currentBid,
  endIn,
  info,
  description,
}) => {
  const [formattedURL, setFormattedURL] = useState<string>();
  const [loadingFailed, setLoadingFailed] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState<boolean>(true);

  useEffect(() => {
    const formattedURL = async () => {
      if (url) {
        const img = await formatURL(url);
        setFormattedURL(img);
      }
    };
    formattedURL();
  }, [url]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirect = () => {
    if (location.pathname === "/marketplace") {
      navigate(`/marketplace-details/${index}`);
    } else if (location.pathname === "/nft-auctions") {
      navigate(`/nft-auction-details/${index}`);
    }
  };

  return (
    <Card className={classes.nft}>
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
        <a onClick={handleRedirect}>
          <img
            src={formattedURL}
            alt="nft-asset"
            onError={() => setLoadingFailed(true)}
            onLoad={() => setImgLoading(false)}
            className={`${classes.img} ${imgLoading && classes.hide_img}`}
          />
        </a>
      )}
      {/* <img src="https://unsplash.it/400/400" className={classes.img} alt="" /> */}
      <div className={classes.content}>
        <span className={classes.title}>{`${name} ${amount}/${total}`}</span>
        <span className={classes.subtitle}>{unitName}</span>
        {type !== "portfolio" ? (
          <>
            <div className={classes.price}>
              {algoPrice}
              <AlgoIcon />
            </div>
            {!currentBid && (
              <span className={classes.unit}>
                {amount}/{total} - {amount} UNITS LEFT
              </span>
            )}
            {currentBid && (
              <div className={classes["current-bid"]}>
                <span>CURRENT BID</span>
                <span>ENDS {endIn} DAYS</span>
              </div>
            )}
            <Button accent="red" onClick={handleRedirect}>
              BUY NOW
            </Button>
          </>
        ) : (
          <ul className={classes.info}>
            {info?.map((inf) => (
              <li key={inf.label}>
                <span>{inf.label}</span>
                <span>{inf.value}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
};
