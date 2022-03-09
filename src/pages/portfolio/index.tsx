import React from 'react'

import { Layout } from 'components'
import { Wallet } from './page-components'
import classes from './index.module.scss'

export const Portfolio: React.FunctionComponent = () => {
  return (
    <Layout>
      <h2 className={classes.title}>Portfolio</h2>
      <span className={classes.subtitle}>Your NFTs</span>

      <Wallet />
    </Layout>
  )
}
