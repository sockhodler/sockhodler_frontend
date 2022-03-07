import React, { useState } from 'react'

import classes from './Accordion.module.scss'
import { Card } from 'components'
import { ReactComponent as ArrowRightIcon } from 'assets/icons/arrow-right.svg'
import { Collapse } from 'react-collapse'
import classNames from 'classnames'

interface Props {
  title: string
  body: string
  isOpen?: boolean
}

export const Accordion: React.FunctionComponent<Props> = ({
  title,
  body,
  isOpen: defaultOpen,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen ? defaultOpen : false)

  return (
    <Card className={classes.container}>
      <button
        className={classNames(
          classes.handle,
          isOpen && classes['handle--open'],
        )}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={classes.handle__text}>{title}</span>
        <div className={classes.handle__divider} />
        <ArrowRightIcon />
      </button>

      <Collapse isOpened={isOpen}>
        <p className={classes.content}>{body}</p>
      </Collapse>
    </Card>
  )
}
