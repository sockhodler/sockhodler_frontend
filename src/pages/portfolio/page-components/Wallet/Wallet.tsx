import React from 'react'

import { Card, Button } from 'components'
import classes from './Wallet.module.scss'

export const Wallet: React.FunctionComponent = () => {
  return (
    <Card className={classes.wallet}>
      <div className={classes.header}>
        <strong>Your Wallet:</strong> <span>SOCKSV3B6CDAE5R4BS5R...</span>
      </div>

      <div className={classes.info}>
        <div className={classes.info__left}>
          <span>ALGO</span>
          <span>500</span>
        </div>
        <div className={classes.divider} />
        <div className={classes.info__right}>
          <span>SOCKS</span>
          <span>150,000</span>
        </div>
      </div>

      <div className={classes.actions}>
        <Button>DISCONNECT</Button>
        <Button>EXPLORER</Button>
      </div>
    </Card>
  )
}
