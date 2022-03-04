import React from 'react'

import { Link } from 'react-router-dom'
import { NavLink, useLocation } from 'react-router-dom'

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
  tabs?: { label: string; value: string }[]
  selectedTab?: string
  onTabChange?: (tab: string) => void
}

const navItems = [
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

export const Header: React.FunctionComponent<Props> = ({
  className,
  tabs,
  selectedTab,
  onTabChange,
}) => {
  const { pathname } = useLocation()

  return (
    <header className={classNames(classes.container, className)}>
      <div className={classes.header}>
        <Link to="/" className={classes.logo}>
          THE SOCK<span>VALUT</span>
        </Link>

        <div className={classes.wallet}>
          <span className={classes.wallet__address}>HMU5393945954...</span>

          <button className={classes.wallet__btn}>
            <WalletIcon />
          </button>
        </div>
      </div>

      <div className={classes.navbar}>
        <nav className={classes['page-nav']}>
          {navItems.map((item) => (
            <NavLink
              to={item.to}
              key={item.label}
              className={({ isActive }) =>
                classNames(
                  classes['page-nav__link'],
                  isActive && classes['page-nav__link--active'],
                )
              }
            >
              {item.icon}
              {item.to === pathname && (
                <span className={classes['page-nav__label']}>{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {tabs && tabs.length > 0 ? (
          <nav className={classes['tabs-tape']}>
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => onTabChange?.(tab.value)}
                className={classNames(
                  classes['tabs-tape__item'],
                  selectedTab === tab.value &&
                    classes['tabs-tape__item--active'],
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  )
}
