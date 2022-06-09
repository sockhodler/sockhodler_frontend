import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as AlgoIcon } from "assets/icons/algo.svg";
import { Card, Button } from "components";
import classes from "./NFT.module.scss";

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

export const NFT: React.FunctionComponent<NftProps> = ({
  title,
  subtitle,
  price,
  unitMin,
  unitMax,
  unitAvailable,
  currentBid,
  endIn,
  type,
  info,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirect = () => {
    if (location.pathname === "/marketplace") {
      navigate("/marketplace-details");
    } else if (location.pathname === "/nft-auctions") {
      navigate("/nft-auction-details");
    }
  };

  return (
    <Card className={classes.nft}>
      <img src="https://unsplash.it/400/400" className={classes.img} alt="" />
      <div className={classes.content}>
        <span className={classes.title}>{title}</span>
        <span className={classes.subtitle}>{subtitle}</span>
        {type !== "portfolio" ? (
          <>
            <div className={classes.price}>
              {price}
              <AlgoIcon />
            </div>
            {unitMin && (
              <span className={classes.unit}>
                {unitMin}/{unitMax} - {unitAvailable} UNITS LEFT
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
