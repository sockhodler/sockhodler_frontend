import React from "react";

import { BaseModal } from "components";
import { ReactComponent as LoadingIcon } from "assets/icons/loading-spinner.svg";

import classes from "./LoadingModal.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LoadingModal: React.FunctionComponent<Props> = ({
  isOpen,
  onClose,
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className={classes.modal}
      noHeader
      persistent
    >
      <div className={classes.content}>
        <LoadingIcon /> Please wait ...
      </div>
    </BaseModal>
  );
};
