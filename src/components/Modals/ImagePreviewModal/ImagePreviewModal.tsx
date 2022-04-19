import React from "react";

import { BaseModal } from "components";

import classes from "./ImagePreviewModal.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ImagePreviewModal: React.FunctionComponent<Props> = ({
  isOpen,
  onClose,
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className={classes.modal}
      noHeader
    >
      <div className={classes.content}>awdawd</div>
    </BaseModal>
  );
};
