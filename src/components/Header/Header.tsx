import React from 'react'

import { Link } from 'react-router-dom'

import classes from './Header.module.scss'

export const navItems = [
  {
    label: 'Home',
    to: '/',
    icon: null,
  },
  {
    label: 'NFT Stacking',
    to: '/nft-stacking',
    icon: null,
  },
  {
    label: 'NFT Auctions',
    to: '/nft-auctions',
    icon: null,
  },
  {
    label: 'Marketplace',
    to: '/marketplace',
    icon: null,
  },
  {
    label: 'Profile',
    to: '/profile',
    icon: null,
  },
]

export const Header: React.FunctionComponent = () => {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        THE SOCK<span>VALUT</span>
      </Link>

      <div className={classes.wallet}>
        <span className={classes.wallet__address}>Lorem ipsum dolor</span>

        <button className={classes.wallet__btn}>x</button>
      </div>
    </header>
  )
}
