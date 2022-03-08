import React from 'react'

import classes from './TextField.module.scss'
import classNames from 'classnames'

interface Props {
  placeholder?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  className?: string
}

export const TextField: React.FunctionComponent<Props> = ({
  placeholder,
  onChange,
  value,
  className,
}) => {
  return (
    <input
      className={classNames(classes.input, className)}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}
