import React from 'react'

import { Button, Card } from 'components'
import classes from './StakingItem.module.scss'

export interface StakingItemProps {
  title: string
  img: string
  details: { label: string; value: string }[]
  info: { label: string; value: string }[]
  onWithdrawClick: () => void
  onWebsiteClick: () => void
  onExplorerClick: () => void
}

export const StakingItem: React.FunctionComponent<StakingItemProps> = ({
  title,
  img,
  details,
  info,
  onWithdrawClick,
  onWebsiteClick,
  onExplorerClick,
}) => {
  return (
    <Card className={classes.container}>
      <div className={classes.header}>{title}</div>

      <div className={classes.row}>
        <div className={classes.column}>
          <img src={img} className={classes.img} alt="" />
        </div>
        <div className={classes.divider} />
        <div className={classes.column}>
          <ul className={classes.details}>
            {details.map((detail) => (
              <li className={classes.detail} key={detail.label}>
                <span>{detail.label}:</span>
                <span>{detail.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.divider} />
        <div className={classes.column}>
          {info.map((inf) => (
            <div className={classes.info} key={inf.label}>
              <span>{inf.label}</span>
              <span>{inf.value}</span>
            </div>
          ))}
        </div>
        <div className={classes.divider} />
        <div className={classes.column}>
          <Button
            size="tiny"
            accent="red"
            sharp
            className={classes.action}
            onClick={onWithdrawClick}
          >
            WITHDRAW
          </Button>
          <div className={classes.actions}>
            <Button size="tiny" accent="purple" sharp onClick={onWebsiteClick}>
              WEBSITE
            </Button>
            <Button size="tiny" accent="black" sharp onClick={onExplorerClick}>
              EXPLORER
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
