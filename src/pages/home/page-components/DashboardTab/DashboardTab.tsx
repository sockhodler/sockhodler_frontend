import React from 'react'

import { LayoutTab, Button, Tabs, Tab } from 'components'
import classNames from 'classnames'
import NftSampleImage from 'assets/images/sample-nft.png'
import Banner from 'assets/images/banner.png'
import { ReactComponent as MngoIcon } from 'assets/icons/mngo.svg'
import { ReactComponent as SockholderIcon } from 'assets/icons/sockholder.svg'
// import { ReactComponent as VerifiedIcon } from 'assets/icons/verified.svg'
import { ReactComponent as ArrowRightIcon } from 'assets/icons/arrow-right.svg'

import VerifiedIcon from 'assets/icons/verified.png'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

import classes from './DashboardTab.module.scss'

interface Props {
  for: string
}

const usdTabDetails = [
  {
    name: 'LIQUIDITY',
    value: '$20,605.93',
  },
  {
    name: 'MARKET CAP',
    value: '$220,336',
  },
  {
    name: 'FDMC',
    value: '$475,416',
  },
  {
    name: 'CIRC. SUPPLY',
    value: '46.34%',
  },
  {
    name: 'TOTAL SUPPLY',
    value: '100,000,000',
  },
]

export const DashboardTab: React.FunctionComponent<Props> = ({
  for: tabFor,
}) => {
  return (
    <LayoutTab for={tabFor}>
      <section className={classes.content}>
        <h2 className={classes.title}>Welcome back</h2>
        <Button className={classes.daily__action}>
          CLAIM DAILY SCAN REWARDS
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
              Suspendisse bibendum tortor ac auctor sollicitudin. Aliquam
              sodales interdum Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero
            </p>
            <Button>BID ON ALGOXNFT</Button>
          </div>
        </div>

        <section className={classes.grid}>
          <div className={classes['grid__left']}>
            <div
              className={classNames(classes['grid-item'], classes.release)}
              style={{ backgroundImage: `url(${NftSampleImage})` }}
            >
              <div className={classes.release__content}>
                <MngoIcon />
                <span>
                  New Collection Released on 05/01/22
                  <br />
                  <br />
                  Reserve your Berd today.
                </span>

                <button>learn more</button>
              </div>
            </div>

            <div className={classNames(classes['grid-item'], classes.price)}>
              <span
                className={classNames(
                  classes['grid-item__title'],
                  classes.price__title,
                )}
              >
                Price Ticker
              </span>

              <Tabs
                tabs={[
                  {
                    label: 'ALGO',
                    value: 'algo',
                  },
                  {
                    label: 'USD',
                    value: 'usd',
                  },
                ]}
                className={classes.price__tabs}
                selected="usd"
              >
                <Tab for="algo">algo</Tab>
                <Tab for="usd">
                  <div className={classes.price__sockholder}>
                    <div className={classes['price__sockholder-grid']}>
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

                    <div className={classes['price__sockholder-price']}>
                      <span>$.004754</span>
                      <span>
                        <ArrowRightIcon />
                        23.04%
                      </span>
                    </div>

                    <div className={classes['price__sockholder-details']}>
                      {usdTabDetails.map((detail) => (
                        <div
                          className={classes['price__sockholder-detail']}
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
            </div>

            <img
              className={classes.banner}
              src={Banner}
              alt=""
              draggable={false}
            />
          </div>

          <div className={classes['grid__right']}>
            <div className={classNames(classes['grid-item'], classes.giveaway)}>
              <div className={classes.giveaway__content}>
                <span
                  className={classNames(
                    classes['grid-item__title'],
                    classes.giveaway__title,
                  )}
                >
                  Active Giveaway
                </span>

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
                      <li>Enter to win MNGO #2469.</li>
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
            </div>

            <div className={classNames(classes['grid-item'], classes.news)}>
              <span
                className={classNames(
                  classes['grid-item__title'],
                  classes.news__title,
                )}
              >
                News
              </span>

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
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                    iriure dolor in hendrerit in vulpu
                  </p>
                </div>
                <div className={classes.news__slide}>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                    iriure dolor in hendrerit in vulpu
                  </p>
                </div>
              </Carousel>
            </div>
          </div>
        </section>
      </section>
    </LayoutTab>
  )
}
