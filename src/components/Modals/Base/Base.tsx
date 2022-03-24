import React, { useEffect } from "react";
import classNames from "classnames";
import Modal from "react-modal";
import classes from "./Base.module.scss";

import { ReactComponent as CloseIcon } from "assets/icons/close.svg";

Modal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  overlayClassName?: string;
  noHeader?: boolean;
}

export const BaseModal: React.FunctionComponent<Props> = ({
  isOpen,
  onClose,
  children,
  className,
  overlayClassName,
  noHeader,
}) => {
  const handleCloseModalOnEsc = (e: React.KeyboardEvent): void => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleCloseModal = (e: React.MouseEvent): void => {
    if ((e.target as Element).className.includes("ReactModal__Overlay")) {
      // onClose();
    }
  };

  // useEffect(() => {
  //   document.addEventListener("keyup", handleCloseModalOnEsc);

  //   return () => {
  //     document.removeEventListener("keyup", handleCloseModalOnEsc);
  //   };
  // }, []);

  return (
    <Modal
      closeTimeoutMS={300}
      isOpen={isOpen}
      className={classNames(classes.modal, className)}
      overlayClassName={classNames(classes.overlay, overlayClassName)}
      onRequestClose={handleCloseModal}
    >
      {!noHeader && (
        <div className={classes.header}>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
      )}

      <div
        className={classNames(
          classes.content,
          noHeader && classes["content--no-header"]
        )}
      >
        {children}
      </div>
    </Modal>
  );
};
