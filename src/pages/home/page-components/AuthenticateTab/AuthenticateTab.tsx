import React, { useState } from "react";
import { ReactComponent as ArrowRightIcon } from "assets/icons/arrow-right.svg";
import { ReactComponent as CheckCircleIcon } from "assets/icons/check-circle.svg";
import { LayoutTab, Button, NFTInfo, ImagePreviewModal } from "components";
import classes from "./AuthenticateTab.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalStep } from "redux/wallet/wallet-slice";
import { RootState } from "redux/rootReducer";
import {
  asyncRedeemNFTSendEmail,
  EmailLoadingId,
} from "redux/email/email-slice";
import { TagModel } from "common/models";

interface Props {
  for: string;
  tag: TagModel | null;
}

export const AuthenticateTab: React.FunctionComponent<Props> = ({
  for: tabFor,
  tag,
}) => {
  const dispatch = useDispatch();
  const [imageLoadFailed, setLoadFailed] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(true);
  console.log("tag", tag);
  const { connected, userInfo, selectedAccount } = useSelector(
    (state: RootState) => state.wallets
  );
  const { loading: emailLoading } = useSelector(
    (state: RootState) => state.email
  );

  const handleRedeemNFTClick = () => {
    if (connected && userInfo.username && userInfo.email) {
      const params = {
        publicAddress: selectedAccount,
        username: userInfo.username,
        email: userInfo.email,
        nftName: "comingSoon",
        asaId: "comingSoon",
      };
      dispatch(asyncRedeemNFTSendEmail(params));
    } else {
      dispatch(setModalStep(1));
    }
  };
  const EXPLORER_URL = "https://algoexplorer.io/address";
  const details = [
    {
      name: "UID",
      value: tag?.uid,
      // to: "https:",
    },
    {
      name: "Token ID",
      value: tag?.nft_token_id,
      // to: "/",
    },
    {
      name: "Owner",
      value: tag?.nft_owner_address,
      to: `${EXPLORER_URL}/${tag?.nft_owner_address}`,
    },
    {
      name: "Creator",
      value: tag?.algo_creator,
      to: `${EXPLORER_URL}/${tag?.algo_creator}`,
    },
    {
      name: "Total Supply",
      value: tag?.algo_total,
      // to: "/",
    },
    {
      name: "Circ. Supply",
      value: tag?.nft_circ_supply,
      // to: "/",
    },
  ];

  const reduceDetailValue = (value: string | number | null | undefined) => {
    if (value === null || value === undefined) return value;

    const stringValue = String(value);

    if (stringValue.length < 9) {
      return stringValue;
    }

    return `${stringValue.substring(0, 4)}...${stringValue.substring(
      stringValue.length - 4
    )}`;
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
          {!imageLoadFailed ? (
            <img
              src={tag?.algo_url ?? "https://unsplash.it/600/600"}
              alt=""
              className={classes.nft__img}
              onLoad={() => setImgLoading(false)}
              onError={() => setLoadFailed(true)}
            />
          ) : (
            <video
              className={classes.nft__img}
              preload="auto"
              autoPlay
              loop
              muted
              onLoadStart={() => setImgLoading(false)}
              onError={() => setImgLoading(false)}
            >
              <source src={tag?.algo_url} type="video/mp4" />
            </video>
          )}

          <div className={classes.nft__info}>
            <span className={classes.nft__title}>{tag?.algo_assetname}</span>
            <p className={classes.nft__details}>{tag?.description}</p>
            <Button
              size="huge"
              className={classes.nft__action}
              onClick={handleRedeemNFTClick}
            >
              {emailLoading.includes(EmailLoadingId.REDEEM_NFT_EMAIL)
                ? "Loading..."
                : "REDEEM NFT"}
            </Button>
          </div>
        </div>

        <div className={classes.details}>
          {details.map((detail) => (
            <NFTInfo
              key={detail.value}
              name={detail.name}
              value={detail.to ? reduceDetailValue(detail.value) : detail.value}
              to={detail.to}
            />
          ))}
        </div>
      </section>

      <ImagePreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
      />
    </LayoutTab>
  );
};
