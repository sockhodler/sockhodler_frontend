import React from 'react'

import { Layout, NFTGrid } from 'components'
import classes from './index.module.scss'

import { NftProps } from 'components/NFT/NFT'

export const NftAuctions: React.FunctionComponent = () => {
  const items: NftProps[] = []
  for (let i = 0; i < 20; i++) {
    items.push({
      title: 'SockHodler 1/250',
      subtitle: 'SOCKHODLER',
      price: 125,
      currentBid: 5,
      endIn: 20,
    })
  }

  return (
    <Layout>
      <h2 className={classes.title}>NFT Auctions</h2>
      <span className={classes.subtitle}>Auction Collection</span>

      <NFTGrid
        back={{ label: 'back to nft auctions', to: '/nft-auctions' }}
        list={items}
        onLoadMoreClick={() => console.log('onLoadMoreClick')}
      />
    </Layout>
  )
}
