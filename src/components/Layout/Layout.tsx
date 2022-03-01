import React from 'react'

import { Header, MobileNav } from 'components'

import classes from './Layout.module.scss'

export const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div className={classes.layout}>
      <Header />
      <main>{children}</main>
      <MobileNav />
    </div>
  )
}
