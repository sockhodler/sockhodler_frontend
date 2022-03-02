import React from 'react'

import classes from './Button.module.scss'
import classNames from 'classnames'

interface Props {
  className?: string
  onClick?: () => void
}

export const Button: React.FunctionComponent<Props> = ({
  className,
  children,
  onClick,
}) => {
  return (
    <button className={classNames(classes.btn, className)} onClick={onClick}>
      {children}
    </button>
  )
}
