import React from 'react'

import { Link } from 'react-router-dom'

import classes from './Header.module.scss'
import classNames from 'classnames'

import { ReactComponent as WalletIcon } from 'assets/icons/wallet.svg'
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg'
import { ReactComponent as NFTStackingIcon } from 'assets/icons/nft-stacking.svg'
import { ReactComponent as NFTAuctionsIcon } from 'assets/icons/nft-auctions.svg'
import { ReactComponent as MarketplaceIcon } from 'assets/icons/marketplace.svg'
import { ReactComponent as ProfileIcon } from 'assets/icons/profile.svg'

interface Props {
  className?: string
}

export const navItems = [
  {
    label: 'Home',
    to: '/',
    icon: <HomeIcon />,
  },
  {
    label: 'NFT Stacking',
    to: '/nft-stacking',
    icon: <NFTStackingIcon />,
  },
  {
    label: 'NFT Auctions',
    to: '/nft-auctions',
    icon: <NFTAuctionsIcon />,
  },
  {
    label: 'Marketplace',
    to: '/marketplace',
    icon: <MarketplaceIcon />,
  },
  {
    label: 'Profile',
    to: '/profile',
    icon: <ProfileIcon />,
  },
]

export const Header: React.FunctionComponent<Props> = ({ className }) => {
  return (
    <header className={classNames(classes.header, className)}>
      <Link to="/" className={classes.logo}>
        THE SOCK<span>VALUT</span>
      </Link>

      <div className={classes.wallet}>
        <span className={classes.wallet__address}>HMU5393945954...</span>

        <button className={classes.wallet__btn}>
          <WalletIcon />
        </button>
      </div>
    </header>
  )
}
