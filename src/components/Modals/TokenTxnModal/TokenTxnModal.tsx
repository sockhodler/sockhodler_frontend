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
      <div className={classes.success}>
        <div className={classes.success__header}>
          <h3 className={classes.success__title}>Daily Rewards</h3>
          <h4 className={classes.success__subtitle}>
            <span>Claimed</span>
          </h4>
        </div>

        <div className={classes.content}>
          <h3 className={classes.content__number}>{data.amount}</h3>
          <p>
            $SOCKS tokens have been transferred to
            <br />
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
            to see the TX details.
          </p>
          <Button onClick={onClose} className={classes.button}>
            OK
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
