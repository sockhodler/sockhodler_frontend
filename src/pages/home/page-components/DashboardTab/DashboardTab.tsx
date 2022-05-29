import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendSOCKToken } from "utils/algorand";
import {
  LayoutTab,
  Button,
  Tabs,
  Tab,
  Card,
  LoadingIndicator,
  TokenTxnModal,
} from "components";
import { ReactComponent as MngoIcon } from "assets/icons/mngo.svg";
import { ReactComponent as SockholderIcon } from "assets/icons/sockholder.svg";
// import { ReactComponent as VerifiedIcon } from 'assets/icons/verified.svg'
import { ReactComponent as ArrowRightIcon } from "assets/icons/arrow-right.svg";
import VerifiedIcon from "assets/icons/verified.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import NftSampleImage from "assets/images/sample-nft.png";
import classes from "./DashboardTab.module.scss";
import { RootState } from "redux/rootReducer";
import { setModalStep } from "redux/wallet/wallet-slice";
import classNames from "classnames";

interface Props {
  for: string;
}

const usdTabDetails = [
  {
    name: "LIQUIDITY",
    value: "$20,605.93",
  },
  {
    name: "MARKET CAP",
    value: "$220,336",
  },
  {
    name: "FDMC",
    value: "$475,416",
  },
  {
    name: "CIRC. SUPPLY",
    value: "46.34%",
  },
  {
    name: "TOTAL SUPPLY",
    value: "100,000,000",
  },
];

interface scanRewardsInfoType {
  loading: boolean;
  txId: string;
  amount: number | undefined;
  success: boolean;
}

export const DashboardTab: React.FunctionComponent<Props> = ({
  for: tabFor,
}) => {
  const dispatch = useDispatch();
  const { connected, selectedAccount } = useSelector(
    (state: RootState) => state.wallets
  );
  const [scanRewardsInfo, setScanRewardsInfo] = useState<scanRewardsInfoType>({
    loading: false,
    txId: "",
    amount: undefined,
    success: false,
  });
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const [availableHour, setAvailableHour] = useState<number>();
  const lastLogin = localStorage.getItem("lastLogin");

  useEffect(() => {
    if (lastLogin) {
      const currentTime = new Date();
      const diffTime = currentTime.getTime() - new Date(lastLogin).getTime();
      if (diffTime < 1000 * 60 * 60 * 24) {
        setDisableBtn(true);
        const availableHour = 24 - Math.ceil(diffTime / 1000 / 60 / 60);
        setAvailableHour(availableHour);
      }
    }
  }, [lastLogin]);

  const handleClaimDailyRewards = async () => {
    if (connected && selectedAccount) {
      const randomAmount = Math.floor(Math.random() * 200);
      setScanRewardsInfo({
        ...scanRewardsInfo,
        loading: true,
        amount: randomAmount,
      });
      try {
        await sendSOCKToken(selectedAccount, randomAmount, setScanRewardsInfo);
      } catch (error) {
        console.error(error);
        setScanRewardsInfo({
          loading: false,
          txId: "",
          amount: undefined,
          success: false,
        });
      }
    } else {
      dispatch(setModalStep(1));
    }
    // await sendSOCKToken()
  };

  return (
    <LayoutTab for={tabFor}>
      <section className={classes.content}>
        <h2 className={classes.title}>Welcome back</h2>
        <Button
          onClick={handleClaimDailyRewards}
          disabled={scanRewardsInfo.loading || disableBtn}
          className={classNames(
            classes.daily__action,
            disableBtn && classes.daily__disable
          )}
          tooltip={disableBtn ? `You can claim in ${availableHour} hours.` : ""}
        >
          {scanRewardsInfo.loading ? (
            <LoadingIndicator />
          ) : (
            "CLAIM DAILY SCAN REWARDS"
          )}
        </Button>

        <div className={classes.nft}>
          <img
            src="https://unsplash.it/600/600"
            alt=""
            className={classes.nft__img}
          />

          <div className={classes.nft__info}>
            <span className={classes.nft__title}>Featured NFT</span>
            <span className={classes.nft__subtitle}>Algopard #488</span>
            <p className={classes.nft__details}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse bibendum tortor ac auctor sollicitudin.
            </p>
            <Button size="huge">BID ON ALGOXNFT</Button>
          </div>
        </div>

        <section className={classes.grid}>
          <div className={classes.grid__left}>
            <Card
              className={classes.release}
              style={{ backgroundImage: `url(${NftSampleImage})` }}
            >
              <div className={classes.release__content}>
                <h2>SOCKBOT</h2>
                <span>
                  New Collection Released on 07/01/22
                  <br />
                  <br />
                  Reserve your SOCKBOT today.
                </span>

                <button>learn more</button>
              </div>
            </Card>

            <Card className={classes.price}>
              <span className={classes.price__title}>Price Ticker</span>

              <Tabs
                tabs={[
                  {
                    label: "ALGO",
                    value: "algo",
                  },
                  {
                    label: "USD",
                    value: "usd",
                  },
                ]}
                className={classes.price__tabs}
                selected="usd"
              >
                <Tab for="algo">algo</Tab>
                <Tab for="usd">
                  <div className={classes.price__sockholder}>
                    <div className={classes["price__sockholder-grid"]}>
                      <SockholderIcon />
                      <span>
                        SOCKHODLER {/* <VerifiedIcon /> */}
                        <img
                          src={VerifiedIcon}
                          alt="verified icon"
                          draggable={false}
                        />
                      </span>
                      <span>SOCKS &nbsp; 452047208</span>
                    </div>

                    <div className={classes["price__sockholder-price"]}>
                      <span>$.004754</span>
                      <span>
                        <ArrowRightIcon />
                        23.04%
                      </span>
                    </div>

                    <div className={classes["price__sockholder-details"]}>
                      {usdTabDetails.map((detail) => (
                        <div
                          className={classes["price__sockholder-detail"]}
                          key={detail.name}
                        >
                          <span>{detail.name}</span>
                          <span>{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </Card>
          </div>

          <div className={classes.grid__right}>
            <Card className={classes.giveaway}>
              <div className={classes.giveaway__content}>
                <span className={classes.giveaway__title}>Active Giveaway</span>

                <div className={classes.giveaway__grid}>
                  <img
                    src="https://unsplash.it/300/300"
                    className={classes.giveaway__img}
                    alt=""
                  />

                  <div className={classes.giveaway__info}>
                    <span className={classes.giveaway__name}>
                      GENESIS - SOXGEN00
                    </span>
                    <ul className={classes.giveaway__details}>
                      <li>Quantity: 1</li>
                      <li>ASA ID: 23594871</li>
                      <li>Enter to win SOXGEN #00.</li>
                    </ul>
                    <p className={classes.giveaway__text}>
                      The contest will conclude on July 4th, 2022.
                      <br />
                      <br />
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                      magna aliquam erat volutpat.
                    </p>
                  </div>
                </div>
              </div>

              <Button className={classes.giveaway__action}>+1 ENTRY</Button>
            </Card>

            <Card className={classes.news}>
              <span className={classes.news__title}>News</span>

              <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                renderArrowPrev={(clickHandler) => (
                  <button
                    className={classes.news__arrow}
                    data-prev
                    onClick={clickHandler}
                  >
                    <ArrowRightIcon />
                  </button>
                )}
                renderArrowNext={(clickHandler) => (
                  <button
                    className={classes.news__arrow}
                    onClick={clickHandler}
                  >
                    <ArrowRightIcon />
                  </button>
                )}
              >
                <div className={classes.news__slide}>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat.
                  </p>
                </div>
                <div className={classes.news__slide}>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat.
                  </p>
                </div>
              </Carousel>
            </Card>
          </div>
          <TokenTxnModal
            isOpen={scanRewardsInfo.success}
            onClose={() =>
              setScanRewardsInfo({
                ...scanRewardsInfo,
                success: false,
              })
            }
            data={scanRewardsInfo}
            addr={selectedAccount}
          />
        </section>
      </section>
    </LayoutTab>
  );
};
