import React from 'react'

import { Layout } from 'components'
import classes from './index.module.scss'

export const ComingSoon: React.FunctionComponent = () => {
  return (
    <Layout>
      <div className={classes.container}>
        <h1 className={classes.title}>Coming Soon</h1>
        <p className={classes.info}>This page will be available soon</p>
      </div>
    </Layout>
  )
}
