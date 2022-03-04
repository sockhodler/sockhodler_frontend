import React from 'react'

import { LayoutTab, Button } from 'components'

import classes from './AuthenticateTab.module.scss'

import { ReactComponent as CheckCircleIcon } from 'assets/icons/check-circle.svg'
import { ReactComponent as ArrowRightIcon } from 'assets/icons/arrow-right.svg'

interface Props {
  for: string
}

const details = [
  {
    name: 'UID',
    value: '042f4442c96e80',
  },
  {
    name: 'Token ID',
    value: '598088282',
  },
  {
    name: 'Owner Address',
    value: 'SOCKSV3B6CDAE5R4BS5...',
  },
  {
    name: 'Creator Address',
    value: 'SOCKSV3B6CDAE5R4BS53...',
  },
  {
    name: 'Total Supply',
    value: '1',
  },
  {
    name: 'Circulating Supply',
    value: '2',
  },
]

export const AuthenticateTab: React.FunctionComponent<Props> = ({
  for: tabFor,
}) => {
  return (
    <LayoutTab for={tabFor}>
      <section className={classes.content}>
        <CheckCircleIcon className={classes['check-icon']} />

        <h2 className={classes.title}>Authenticated</h2>
        <p className={classes.subtitle}>
          Powered by
          <a href="#">SockHodler</a>x<a href="#">SmartSeal.io</a>
        </p>

        <div className={classes.nft}>
          <img
            src="https://unsplash.it/600/600"
            alt=""
            className={classes.nft__img}
          />

          <div className={classes.nft__info}>
            <span className={classes.nft__title}>SockHodler 1/250</span>
            <p className={classes.nft__details}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse bibendum tortor ac auctor sollicitudin. Aliquam
              sodales interdum Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero
            </p>
            <Button>REDEEM NFT</Button>
          </div>
        </div>

        <ul className={classes.details}>
          {details.map((detail) => (
            <li className={classes.detail} key={detail.value}>
              <span className={classes.detail__name}>{detail.name}</span>
              <div className={classes.detail__divider} />
              <a href="#" className={classes.detail__value}>
                {detail.value}
              </a>
              <div className={classes.detail__divider} />
              <button className={classes.detail__action}>
                <ArrowRightIcon />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </LayoutTab>
  )
}
