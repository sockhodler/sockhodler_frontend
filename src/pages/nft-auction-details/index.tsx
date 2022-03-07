import React from 'react'

import { Layout, NFTDetails } from 'components'
import classes from './index.module.scss'
import { ReactComponent as AlgoIcon } from 'assets/icons/algo.svg'

const infoItems = [
  {
    title: 'Current Bid',
    value: (
      <span>
        125
        <AlgoIcon />
      </span>
    ),
  },
  {
    title: 'Starting Bid',
    value: (
      <span>
        125
        <AlgoIcon />
      </span>
    ),
  },
  {
    title: 'Quantity Available',
    value: '50',
  },
  {
    title: 'Auction Ends',
    value: '3 Days 43m left',
  },
]

const details = [
  {
    name: 'Asset ID',
    value: '545366852',
    to: '/',
  },
  {
    name: 'App ID',
    value: '6112547',
    to: '/',
  },
  {
    name: 'Royalty',
    value: '5%',
    to: '/',
  },
  {
    name: 'Creator',
    value: 'SOCKSV3AE5R4BS5...',
    to: '/',
  },
  {
    name: 'Escrow',
    value: '4GB16A567B776GB...',
    to: '/',
  },
]

export const NFTAuctionDetails: React.FunctionComponent = () => {
  return (
    <Layout>
      <h2 className={classes.title}>NFT Auctions</h2>
      <span className={classes.subtitle}>Auction Listing</span>

      <NFTDetails
        back={{ label: 'back to nft auctions', to: '/nft-auctions' }}
        title="Taco Coin - Meet Me at Dora’s #1"
        imgSrc="https://unsplash.it/700/700"
        actionLabel="BID"
        onActionClick={() => console.log('on action click')}
        info={infoItems}
        details={details}
      />
    </Layout>
  )
}
