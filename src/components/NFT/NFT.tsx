import React from 'react'

import classes from './NFT.module.scss'
import { Card, Button } from 'components'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as AlgoIcon } from 'assets/icons/algo.svg'

export interface NftProps {
  title: string
  subtitle: string
  price: number
  unitMin?: number
  unitMax?: number
  unitAvailable?: number
  currentBid?: number
  endIn?: number
}

export const NFT: React.FunctionComponent<NftProps> = ({
  title,
  subtitle,
  price,
  unitMin,
  unitMax,
  unitAvailable,
  currentBid,
  endIn,
}) => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/nft-auction-details')
  }

  return (
    <Card className={classes.nft}>
      <img src="https://unsplash.it/400/400" className={classes.img} alt="" />
      <div className={classes.content}>
        <span className={classes.title}>{title}</span>
        <span className={classes.subtitle}>{subtitle}</span>
        <div className={classes.price}>
          {price}
          <AlgoIcon />
        </div>
        {unitMin && (
          <span className={classes.unit}>
            {unitMin}/{unitMax} - {unitAvailable} UNITS LEFT
          </span>
        )}
        {currentBid && (
          <div className={classes['current-bid']}>
            <span>CURRENT BID</span>
            <span>ENDS {endIn} DAYS</span>
          </div>
        )}
        <Button accent="red" onClick={handleRedirect}>
          BUY NOW
        </Button>
      </div>
    </Card>
  )
}
