import React from 'react'

import classes from './Button.module.scss'

export const Button: React.FunctionComponent = ({ children }) => {
  return <button>{children}</button>
}
