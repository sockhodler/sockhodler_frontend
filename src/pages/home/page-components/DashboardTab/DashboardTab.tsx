import React from 'react'

import { LayoutTab, Button } from 'components'

import classes from './DashboardTab.module.scss'

interface Props {
  for: string
}

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
            src="https://unsplash.it/414/414"
            alt=""
            className={classes.nft__img}
          />

          <div className={classes.nft__info}>
            <span className={classes.nft__title}>Featured NFT</span>
            <span className={classes.nft__subtitle}>Algopard #488</span>
            <p className={classes.nft__details}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse bibendum tortor ac auctor sollicitudin. Aliquam
              sodales interdum.... <button>more</button>
            </p>
            <Button>BID ON ALGOXNFT</Button>
          </div>
        </div>

        <div className={classes.grid}></div>
      </section>
    </LayoutTab>
  )
}
