import React, { useState, createContext } from 'react'
import classNames from 'classnames'

import classes from './LayoutTabs.module.scss'

interface Props {
  tabs: { label: string; value: string | number }[]
}

export const LayoutTabContext = createContext<string | number>('')
LayoutTabContext.displayName = 'LayoutTabContext'

export const LayoutTabs: React.FunctionComponent<Props> = ({
  tabs,
  children,
}) => {
  const [selected, setSelected] = useState(tabs.length > 0 ? tabs[0].value : '')

  return (
    <div className={classes.tabs}>
      <nav className={classes.tape}>
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

      <LayoutTabContext.Provider value={selected}>
        {children}
      </LayoutTabContext.Provider>
    </div>
  )
}
