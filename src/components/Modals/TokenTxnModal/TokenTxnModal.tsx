import React from "react";

import { BaseModal, Button } from "components";
import { formatAddress } from "common/helper/FormatAddress";
import classes from "./TokenTxnModal.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  addr: string;
}

export const TokenTxnModal: React.FunctionComponent<Props> = ({
  isOpen,
  onClose,
  data,
  addr,
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
        <p>
          {data.amount} SOCK token is transferred to{" "}
          <a href={`https://algoexplorer.io/address/${addr}`}>
            {formatAddress(addr)}
          </a>
        </p>
        <br />
        <p>
          <a
            href={`https://algoexplorer.io/tx/${data.txId}`}
            target="_blank"
            rel="noreferrer"
          >
            Click here
          </a>{" "}
          see the tx details.
        </p>
        <Button onClick={onClose}>OK</Button>
      </div>
    </BaseModal>
  );
};
