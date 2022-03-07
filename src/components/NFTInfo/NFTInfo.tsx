import React from 'react'

import classes from './NFTInfo.module.scss'
import { ReactComponent as ArrowRightIcon } from 'assets/icons/arrow-right.svg'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

interface Props {
  value: string
  name: string
  to: string
  size?: 'small'
}

export const NFTInfo: React.FunctionComponent<Props> = ({
  value,
  name,
  to,
  size,
}) => {
  return (
    <div
      className={classNames(classes.info, size && classes[size])}
      key={value}
    >
      <span className={classes.name}>{name}</span>
      <div className={classes.divider} />
      <a href={to} className={classes.value}>
        {value}
      </a>
      <div className={classes.divider} />
      <Link to={to} className={classes.action}>
        <ArrowRightIcon />
      </Link>
    </div>
  )
}
