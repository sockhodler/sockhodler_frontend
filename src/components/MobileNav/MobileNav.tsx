import React from 'react'

import { NavLink, useLocation } from 'react-router-dom'

import classes from './MobileNav.module.scss'

import { navItems } from 'components/Header/Header'
import classNames from 'classnames'

export const MobileNav: React.FunctionComponent = () => {
  const { pathname } = useLocation()

  return (
    <nav className={classes.nav}>
      {navItems.map((item) => (
        <NavLink
          to={item.to}
          key={item.label}
          className={({ isActive }) =>
            classNames(
              classes.nav__link,
              isActive && classes['nav__link--active'],
            )
          }
        >
          {item.icon}
          {item.to === pathname && (
            <span className={classes.nav__label}>{item.label}</span>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
