import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "assets/icons/arrow-right.svg";
import { NFT, Button } from "components";
import { MarketplaceItemType } from "components/NFT/NFT";
import classes from "./NFTGrid.module.scss";

interface Props {
  list: MarketplaceItemType[];
  onLoadMoreClick?: () => void;
  back: { label: string; to: string };
  type?: "portfolio";
}

export const NFTGrid: React.FunctionComponent<Props> = ({
  list,
  onLoadMoreClick,
  back,
  type,
}) => {
  return (
    <div className={classes.grid}>
      <div className={classes.grid__header}>
        <Link to={back.to}>
          <ArrowRightIcon />
          <span>{back.label}</span>
        </Link>
      </div>

      <div className={classes.grid__list}>
        {list.map((nft, index) => (
          <NFT key={index} {...nft} type={type} />
        ))}
      </div>

      <Button
        size="huge"
        className={classes["grid__load-more"]}
        onClick={onLoadMoreClick}
      >
        LOAD MORE
      </Button>
    </div>
  );
};
