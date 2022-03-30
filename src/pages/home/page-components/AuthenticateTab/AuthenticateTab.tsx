import React from "react";
import { useQuery } from "hooks";
import { ReactComponent as ArrowRightIcon } from "assets/icons/arrow-right.svg";
import { ReactComponent as CheckCircleIcon } from "assets/icons/check-circle.svg";
import { LayoutTab, Button, NFTInfo } from "components";
import classes from "./AuthenticateTab.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalStep } from "redux/wallet/wallet-slice";
import { RootState } from "redux/rootReducer";

interface Props {
  for: string;
}

const details = [
  {
    name: "UID",
    value: "042f4442c96e80",
    to: "/",
  },
  {
    name: "Token ID",
    value: "598088282",
    to: "/",
  },
  {
    name: "Owner Address",
    value: "SOCKSV3B6CDAE5R4BS5...",
    to: "/",
  },
  {
    name: "Creator Address",
    value: "SOCKSV3B6CDAE5R4BS53...",
    to: "/",
  },
  {
    name: "Total Supply",
    value: "1",
    to: "/",
  },
  {
    name: "Circulating Supply",
    value: "2",
    to: "/",
  },
];

export const AuthenticateTab: React.FunctionComponent<Props> = ({
  for: tabFor,
}) => {
  const query = useQuery();
  const dispatch = useDispatch();
  const { connected } = useSelector((state: RootState) => state.wallets);

  const tid = query.get("tid");
  const cid = query.get("cid");
  const pl = query.get("pl");

  console.log("query", query.get("tab"));

  const handleRedeemNFTClick = () => {
    if (connected) {
      console.log("redeem click");
    } else {
      dispatch(setModalStep(1));
    }
  };

  return (
    <LayoutTab for={tabFor}>
      <section className={classes.content}>
        <CheckCircleIcon className={classes["check-icon"]} />

        <h2 className={classes.title}>Authenticated</h2>
        <p className={classes.subtitle}>
          Powered by
          <a href="#">SockHodler</a>x<a href="#">SmartSeal.io</a>
        </p>

        <div className={classes.nft}>
          <img
            src="https://unsplash.it/600/600"
            alt=""
            className={classes.nft__img}
          />

          <span className={classes.nft__title}>SockHodler 1/250</span>
          <div className={classes.nft__info}>
            <p className={classes.nft__details}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse bibendum tortor ac auctor sollicitudin. Aliquam
              sodales interdum Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero
            </p>
          </div>
          <Button
            size="huge"
            className={classes.nft__action}
            onClick={handleRedeemNFTClick}
          >
            REDEEM NFT
          </Button>
        </div>

        <div className={classes.details}>
          {details.map((detail) => (
            <NFTInfo
              key={detail.value}
              name={detail.name}
              value={detail.value}
              to={detail.to}
            />
          ))}
        </div>
      </section>
    </LayoutTab>
  );
};
