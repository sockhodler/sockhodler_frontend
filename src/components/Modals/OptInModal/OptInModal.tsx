import React from "react";

import { BaseModal, Button } from "components";
import { formatAddress } from "common/helper/FormatAddress";
import classes from "./OptInModal.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  addr: string;
}

export const OptInModal: React.FunctionComponent<Props> = ({
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
      <div className={classes.optin}>
        <div className={classes.optin__header}>
          <h3 className={classes.optin__title}>Daily Rewards</h3>
          <h4 className={classes.optin__subtitle}>
            <span>Transaction Error</span>
          </h4>
        </div>

        <div className={classes.content}>
          <h3 className={classes.content__number}>{data.amount}</h3>
          <p>
            The transaction cannot be sent to: <br />
            <a href={`https://algoexplorer.io/address/${addr}`}>
              {formatAddress(addr)}
            </a>
          </p>
          <br />
          <p>
            Please Opt-In to the <br />
            <strong>$SOCKS</strong>
            {` `}
            Token Asset (ASA ID: 452047208) via your wallet app and try again.
          </p>
          <br />
          <p>
            <a
              href="https://algoexplorer.io/asset/452047208"
              target="_blank"
              rel="noreferrer"
            >
              Click here
            </a>
            {` `}
            to view the asset on AlgoExplorer.
          </p>
          <Button onClick={onClose} className={classes.button}>
            OK
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
