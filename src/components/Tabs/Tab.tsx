import React, { useContext } from 'react'

import classNames from 'classnames'

import classes from './Tab.module.scss'
import { TabsContext } from './Tabs'

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tab must be inside of <Tabs />')
  }
  return context
}

interface Props {
  for: string
}

export const Tab: React.FunctionComponent<Props> = ({
  for: forTab,
  children,
}) => {
  const selected = useTabsContext()

  return (
    <div
      className={classNames(
        classes.tab,
        selected === forTab && classes['tab--active'],
      )}
    >
      {children}
    </div>
  )
}
