import React from "react";

import { BaseModal, Button, TextField } from "components";
import classes from "./AdminPanelLoginModal.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelLoginModal: React.FunctionComponent<Props> = ({
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
      <div className={classes.content}>
        <h2 className={classes.title}>Admin Panel</h2>
        <span className={classes.subtitle}>Login</span>

        <div className={classes.form}>
          <TextField placeholder="Username" />
          <TextField placeholder="Email" />
          <Button size="small" accent="gr-top-bottom">
            Continue
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
