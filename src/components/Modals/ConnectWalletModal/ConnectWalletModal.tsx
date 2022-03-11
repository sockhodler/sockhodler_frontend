import React, { useState } from "react";
import { BaseModal, Button, TextField } from "components";
import classes from "./ConnectWalletModal.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import classNames from "classnames";

import { ReactComponent as MyAlgoIcon } from "assets/icons/my-algo.svg";
import { ReactComponent as AlgoSignerIcon } from "assets/icons/algosigner.svg";
import { ReactComponent as PeraIcon } from "assets/icons/pera.svg";
import { ReactComponent as SockholderLogo } from "assets/icons/sockholder-logo.svg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onWalletClick: (id: string) => void;
}

export const ConnectWalletModal: React.FunctionComponent<Props> = ({
  isOpen,
  onClose,
  onWalletClick,
}) => {
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    setStep((s) => s + 1);
  };

  const handlePrevStep = () => {
    setStep((s) => s - 1);
  };

  const handleOnClose = () => {
    onClose();
    setStep(0);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleOnClose}
      className={classes.modal}
    >
      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        showArrows={false}
        selectedItem={step}
      >
        {/* welcome step */}
        <div className={classNames(classes.step, classes["step-welcome"])}>
          <div className={classes.step__header}>
            <h3 className={classes.step__title}>TO CONTINUE USING THIS APP</h3>
            <h4 className={classes.step__subtitle}>
              LOGIN WITH YOUR PREFERRED WALLET
            </h4>
          </div>

          <div className={classes["step-welcome__grid"]}>
            <div className={classes["step-welcome__logos"]}>
              <button onClick={() => onWalletClick("my-algo-connect")}>
                <MyAlgoIcon />
              </button>
              <button onClick={() => onWalletClick("algo-signer")}>
                <AlgoSignerIcon />
              </button>
              <button onClick={() => onWalletClick("wallet-connect")}>
                <PeraIcon />
              </button>
            </div>

            <div className={classes["step-welcome__divider"]} />

            <div className={classes["step-welcome__actions"]}>
              <span>New to Algorand Wallets?</span>
              <Button
                size="small"
                accent="gr-top-bottom"
                className={classes.step__action}
                onClick={handleNextStep}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* enter info step */}
        <div className={classNames(classes.step, classes["step-info"])}>
          <div className={classes.step__header}>
            <h3 className={classes.step__title}>Enter your info</h3>
            <h4 className={classes.step__subtitle}>
              TO ENJOY THE FEATURES OF THIS APP
            </h4>
          </div>

          <div className={classes["step-info__form"]}>
            <TextField placeholder="Username" />
            <TextField placeholder="Email" />
            <Button
              size="small"
              accent="gr-top-bottom"
              className={classes.step__action}
              onClick={handleNextStep}
            >
              Continue
            </Button>
          </div>
        </div>

        {/* enter info step */}
        <div className={classNames(classes.step, classes["step-verify"])}>
          <div className={classes.step__header}>
            <h3 className={classes.step__title}>ENTER THE 6 DIGIT CODE</h3>
            <h4 className={classes.step__subtitle}>
              EMAILED TO TEST@TESTAPP.COM
            </h4>
          </div>

          <div className={classes["step-verify__form"]}>
            <TextField placeholder="Enter Verification Code" />
            <Button
              size="small"
              accent="gr-top-bottom"
              className={classes.step__action}
              onClick={handleNextStep}
            >
              Continue
            </Button>
          </div>
        </div>

        {/* enter info step */}
        <div className={classNames(classes.step, classes["step-congrats"])}>
          <SockholderLogo />

          <div className={classes.step__header}>
            <h3 className={classes.step__title}>CONGRATS!</h3>
            <h4 className={classes.step__subtitle}>
              YOU&apos;RE ALL SET TO EARN REWARDS
            </h4>
          </div>

          <Button
            size="small"
            accent="gr-top-bottom"
            className={classes.step__action}
          >
            Let&apos;s Get Scanning
          </Button>
        </div>
      </Carousel>
    </BaseModal>
  );
};
