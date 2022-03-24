import React, { useState } from "react";
import { BaseModal, Button, TextField } from "components";
import classes from "./ConnectWalletModal.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  setModalStep,
  asyncRegisterUser,
  WalletLoadingId,
  asyncVerifyUser,
  setLoginSuccess,
  asyncReverifyUser,
  asyncClearUser,
} from "redux/wallet/wallet-slice";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { RootState } from "redux/rootReducer";

import { ReactComponent as MyAlgoIcon } from "assets/icons/my-algo.svg";
import { ReactComponent as AlgoSignerIcon } from "assets/icons/algosigner.svg";
import { ReactComponent as PeraIcon } from "assets/icons/pera.svg";
import { ReactComponent as SockholderLogo } from "assets/icons/sockholder-logo.svg";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onWalletClick: (id: string) => void;
  step: number;
}

export interface enterInfoForm {
  username: string;
  email: string;
}

const enterInfoSchema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

export const ConnectWalletModal: React.FunctionComponent<Props> = ({
  isOpen,
  onClose,
  onWalletClick,
  step,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<enterInfoForm>({
    resolver: yupResolver(enterInfoSchema),
    mode: "onSubmit",
  });

  const dispatch = useDispatch();
  const { loading, userInfo, selectedAccount } = useSelector(
    (state: RootState) => state.wallets
  );
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const cacheEmail = localStorage.getItem("email");

  const handleVerifyCode = () => {
    if (cacheEmail) {
      dispatch(
        asyncVerifyUser({
          email: cacheEmail,
          code,
        })
      );
    }
  };
  const handleCongratsClick = () => {
    dispatch(setModalStep(0));
    dispatch(setLoginSuccess(true));
    localStorage.removeItem("email");
  };
  const handleNextStep = () => {
    dispatch(setModalStep(step + 1));
  };

  const handlePrevStep = () => {
    dispatch(setModalStep(step + 1));
  };

  const handleOnClose = () => {
    dispatch(setModalStep(0));
  };

  const onEnterInfoSubmit = (data: enterInfoForm) => {
    setUsername(data.username);
    setEmail(data.email);

    const publicAddress = localStorage.getItem("selectedAccount");
    if (publicAddress) {
      dispatch(
        asyncRegisterUser({
          email: data.email,
          username: data.username,
          publicAddress,
        })
      );
    } else if (selectedAccount) {
      dispatch(
        asyncRegisterUser({
          email: data.email,
          username: data.username,
          publicAddress: selectedAccount,
        })
      );
    }
  };

  const handleClearUserClick = () => {
    const publicAddress = localStorage.getItem("selectedAccount");
    if (publicAddress && userInfo.username && userInfo.email) {
      dispatch(
        asyncClearUser({
          email: userInfo.email,
          username: userInfo.username,
          publicAddress,
        })
      );
    }
  };

  const handleVerifyUserClick = () => {
    const publicAddress = localStorage.getItem("selectedAccount");
    if (publicAddress && userInfo.username && userInfo.email) {
      dispatch(
        asyncReverifyUser({
          email: userInfo.email,
          username: userInfo.username,
          publicAddress,
        })
      );
    }
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
        selectedItem={step - 1}
        swipeable={false}
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
                // onClick={handleNextStep}
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

          <form
            className={classes["step-info__form"]}
            onSubmit={handleSubmit(onEnterInfoSubmit)}
          >
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  placeholder="Username"
                  required
                  error={!!errors.username}
                  {...field}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  placeholder="Email"
                  required
                  error={!!errors.email}
                  {...field}
                />
              )}
            />

            <Button
              size="small"
              accent="gr-top-bottom"
              className={classes.step__action}
              type="submit"
            >
              {loading.includes(WalletLoadingId.REGISTER_USER)
                ? "Registering..."
                : "Continue"}
            </Button>
          </form>
        </div>

        {/* verify step */}
        <div className={classNames(classes.step, classes["step-verify"])}>
          <div className={classes.step__header}>
            <h3 className={classes.step__title}>ENTER THE 6 DIGIT CODE</h3>
            <h4 className={classes.step__subtitle}>
              EMAILED TO <span>{cacheEmail}</span>
            </h4>
          </div>

          <div className={classes["step-verify__form"]}>
            <TextField
              placeholder="Enter Verification Code"
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              size="small"
              accent="gr-top-bottom"
              className={classes.step__action}
              onClick={handleVerifyCode}
            >
              {loading.includes(WalletLoadingId.VERIFY_USER)
                ? "Verifying..."
                : "Continue"}
            </Button>
          </div>
        </div>

        {/* congrats step */}
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
            onClick={handleCongratsClick}
          >
            Go
            {/* Let&apos;s Get Scanning */}
          </Button>
        </div>

        {/* not verified step */}
        <div className={classNames(classes.step, classes["step-not-verified"])}>
          <p className={classes["step-not-verified__text"]}>
            The wallet is registered by following user but not verified.
          </p>

          <div className={classes["step-not-verified__info"]}>
            <span>Username: {userInfo.username}</span>
            <span>Email: {userInfo.email}</span>
          </div>

          <div className={classes["step-not-verified__actions"]}>
            <Button
              size="small"
              accent="gr-top-bottom"
              loading={loading.includes(WalletLoadingId.CLEAR_USER)}
              disabled={
                loading.includes(WalletLoadingId.CLEAR_USER) ||
                loading.includes(WalletLoadingId.REVERIFY_USER)
              }
              onClick={handleClearUserClick}
            >
              Clear user
            </Button>
            <Button
              size="small"
              accent="gr-top-bottom"
              loading={loading.includes(WalletLoadingId.REVERIFY_USER)}
              disabled={
                loading.includes(WalletLoadingId.CLEAR_USER) ||
                loading.includes(WalletLoadingId.REVERIFY_USER)
              }
              onClick={handleVerifyUserClick}
            >
              Verify user
            </Button>
          </div>
        </div>
      </Carousel>
    </BaseModal>
  );
};
