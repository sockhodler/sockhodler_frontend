import React from 'react'

import { Layout, NFTDetails } from 'components'
import classes from './index.module.scss'
import { ReactComponent as AlgoIcon } from 'assets/icons/algo.svg'

const faqItems = [
  {
    title: 'Sizing Guide',
    body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Shipping and Returns',
    body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
    isOpen: true,
  },
  {
    title: 'Wash and Care',
    body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
  },
]

const infoItems = [
  {
    title: 'Price',
    value: (
      <span>
        125
        <AlgoIcon />
      </span>
    ),
  },
  {
    title: 'Quantity Remaining',
    value: '50',
  },
  {
    title: 'Total Minted',
    value: '250',
  },
  {
    value: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
    diam nonummy nibh euismod tincidunt ut laoreet dolore magna
    aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
    nostrud exerci tation ullamcorper suscipit lobortis nisl ut
    aliquip ex ea commodo consequat.`,
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

export const MarketplaceDetails: React.FunctionComponent = () => {
  return (
    <Layout>
      <h2 className={classes.title}>Marketplace</h2>
      <span className={classes.subtitle}>Physically-Backed NFT Socks</span>

      <NFTDetails
        back={{ label: 'back to home', to: '/' }}
        title="Taco Coin - Meet Me at Dora’s #1"
        imgSrc="https://unsplash.it/700/700"
        faqItems={faqItems}
        actionLabel="BUY NOW"
        onActionClick={() => console.log('on action click')}
        info={infoItems}
        details={details}
      />
    </Layout>
  )
}
