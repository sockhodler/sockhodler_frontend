import React, { useState } from "react";

import { BaseModal } from "components";

import classes from "./AssetPreviewModal.module.scss";
import classNames from "classnames";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  asset: string;
}

export const AssetPreviewModal: React.FunctionComponent<Props> = ({
  isOpen,
  onClose,
  asset,
}) => {
  const [imageLoadFailed, setLoadFailed] = useState(false);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className={classes.modal}
      noHeader
    >
      <div className={classes.content}>
        {imageLoadFailed ? (
          <img src={asset} alt="" onError={() => setLoadFailed(true)} />
        ) : (
          <video preload="auto" autoPlay loop muted>
            <source src={asset} type="video/mp4" />
          </video>
        )}
      </div>
    </BaseModal>
  );
};
