import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowRightIcon } from "assets/icons/arrow-right.svg";
import { ReactComponent as CheckCircleIcon } from "assets/icons/check-circle.svg";
import {
  LayoutTab,
  Button,
  NFTInfo,
  AssetPreviewModal,
  LoadingIndicator,
} from "components";
import classes from "./AuthenticateTab.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalStep } from "redux/wallet/wallet-slice";
import { RootState } from "redux/rootReducer";
import {
  asyncRedeemNFTSendEmail,
  EmailLoadingId,
} from "redux/email/email-slice";
import { TagModel } from "common/models";
import { TagsLoadingId } from "redux/tags/tags-slice";

interface Props {
  for: string;
  tagData: TagModel | null;
}

export const AuthenticateTab: React.FunctionComponent<Props> = ({
  for: tabFor,
  tagData,
}) => {
  const ASSET_PREVIEW_MODAL_DEFAULT = {
    isOpen: false,
    asset: "",
  };

  const dispatch = useDispatch();
  const [imageLoadFailed, setLoadFailed] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [details, setDetails] = useState<any[]>([]);
  const [tag, setTag] = useState<any>({});
  const [assetPreviewModal, setAssetPreviewModal] = useState(
    ASSET_PREVIEW_MODAL_DEFAULT
  );

  const { connected, userInfo, selectedAccount } = useSelector(
    (state: RootState) => state.wallets
  );
  const { loading: emailLoading } = useSelector(
    (state: RootState) => state.email
  );
  const { authenticatedTag, loading } = useSelector(
    (state: RootState) => state.tags
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
  const ASSET_URL = "https://algoexplorer.io/asset/";
  useEffect(() => {
    if (authenticatedTag && authenticatedTag.tag) {
      const { tag } = authenticatedTag;
      setTag(tag);
      setDetails([
        {
          name: "UID",
          value: tag.uid,
          // to: "https:",
        },
        {
          name: "Token ID",
          value: tag.algo_id,
          to: `${ASSET_URL}/${tag?.algo_id}`,
        },
        {
          name: "Owner",
          value: tag.nft_owner_address,
          to: `${EXPLORER_URL}/${tag?.nft_owner_address}`,
        },
        {
          name: "Creator",
          value: tag.algo_creator,
          to: `${EXPLORER_URL}/${tag?.algo_creator}`,
        },
        {
          name: "Total Supply",
          value: tag.algo_total,
          // to: "/",
        },
        {
          name: "Circ. Supply",
          value: tag.algo_circulatingsupply,
          // to: "/",
        },
      ]);
    }
  }, [authenticatedTag]);

  const reduceDetailValue = (value: string | number | null | undefined) => {
    if (value === null || value === undefined) return value;

    const stringValue = String(value);

    if (stringValue.length < 10) {
      return stringValue;
    }

    return `${stringValue.substring(0, 5)}...${stringValue.substring(
      stringValue.length - 5
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

        {loading.includes(TagsLoadingId.AUTHENTICATE_TAG) ? (
          <LoadingIndicator />
        ) : (
          authenticatedTag && (
            <>
              <div className={classes.nft}>
                {!imageLoadFailed ? (
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <img
                    src={tag?.algo_url ?? "https://unsplash.it/600/600"}
                    alt=""
                    className={classes.nft__img}
                    onLoad={() => setImgLoading(false)}
                    onError={() => setLoadFailed(true)}
                    onClick={() =>
                      setAssetPreviewModal({
                        isOpen: true,
                        asset: tag?.algo_url ?? "https://unsplash.it/600/600",
                      })
                    }
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
                    onClick={() =>
                      setAssetPreviewModal({
                        isOpen: true,
                        asset: tag?.algo_url || "",
                      })
                    }
                  >
                    <source src={tag?.algo_url} type="video/mp4" />
                  </video>
                )}

                <div className={classes.nft__info}>
                  <span className={classes.nft__title}>
                    {tag?.algo_assetname}
                  </span>
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
                {details.map((detail, index) => (
                  <NFTInfo
                    key={index}
                    name={detail.name}
                    value={
                      detail.to ? reduceDetailValue(detail.value) : detail.value
                    }
                    to={detail.to}
                  />
                ))}
              </div>
            </>
          )
        )}
      </section>

      <AssetPreviewModal
        isOpen={assetPreviewModal.isOpen}
        onClose={() => setAssetPreviewModal(ASSET_PREVIEW_MODAL_DEFAULT)}
        asset={assetPreviewModal.asset}
      />
    </LayoutTab>
  );
};
