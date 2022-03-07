import React from 'react'

import { Link } from 'react-router-dom'
import { Layout, Tabs, Tab, NFT, Button } from 'components'
import classes from './index.module.scss'
import { ReactComponent as ArrowRightIcon } from 'assets/icons/arrow-right.svg'

import { NftProps } from 'components/NFT/NFT'

interface NftGridProps {
  list: NftProps[]
}

const NftGrid: React.FunctionComponent<NftGridProps> = ({ list }) => {
  return (
    <div className={classes.grid}>
      <div className={classes.grid__header}>
        <Link to="/">
          <ArrowRightIcon />
          <span>back to home</span>
        </Link>
      </div>

      <div className={classes.grid__list}>
        {list.map((nft) => (
          <NFT {...nft} />
        ))}
      </div>

      <Button size="huge" className={classes['grid__load-more']}>
        LOAD MORE
      </Button>
    </div>
  )
}

export const Marketplace: React.FunctionComponent = () => {
  const items: NftProps[] = []
  for (let i = 0; i < 20; i++) {
    items.push({
      title: 'SockHodler 1/250',
      subtitle: 'SOCKHODLER',
      price: 125,
      unitMin: 1,
      unitMax: 250,
      unitAvailable: 24,
    })
  }

  return (
    <Layout>
      <h2 className={classes.title}>Marketplace</h2>
      <span className={classes.subtitle}>Physically-Backed NFT Socks</span>

      <Tabs
        tabs={[
          {
            label: 'Base Collection',
            value: 'base-collection',
          },
          {
            label: 'Genesis Collection',
            value: 'genesis-collection',
          },
          {
            label: 'Collabs',
            value: 'collabs',
          },
        ]}
      >
        <Tab for="base-collection">
          <NftGrid list={items} />
        </Tab>

        <Tab for="genesis-collection">genesis-collection</Tab>

        <Tab for="collabs">collabs</Tab>
      </Tabs>
    </Layout>
  )
}
