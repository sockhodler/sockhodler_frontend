import React, { useState, createContext } from 'react'

import classNames from 'classnames'

import classes from './Tabs.module.scss'

export const TabsContext = createContext<string | number>('')

interface Props {
  tabs: { label: string; value: string | number }[]
  className?: string
  selected?: string
}

export const Tabs: React.FunctionComponent<Props> = ({
  tabs = [],
  children,
  className,
  selected: selectedTab,
}) => {
  const defaultTab = selectedTab
    ? selectedTab
    : tabs.length > 0
    ? tabs[0].value
    : ''
  const [selected, setSelected] = useState(defaultTab)

  return (
    <div className={classes.tabs}>
      <nav className={classNames(classes.tape, className)}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelected(tab.value)}
            className={classNames(
              classes.tape__item,
              selected === tab.value && classes['tape__item--active'],
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <TabsContext.Provider value={selected}>{children}</TabsContext.Provider>
    </div>
  )
}
