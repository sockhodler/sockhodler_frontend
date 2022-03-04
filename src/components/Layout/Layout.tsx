import React, { useState, useEffect, createContext } from 'react'

import { Header } from 'components'
import classes from './Layout.module.scss'
import { useSearchParams } from 'react-router-dom'

export const LayoutTabContext = createContext<string>('')
LayoutTabContext.displayName = 'LayoutTabContext'

interface Props {
  tabs?: { label: string; value: string }[]
}

export const Layout: React.FunctionComponent<Props> = ({ children, tabs }) => {
  const defaultTabValue = tabs && tabs.length > 0 ? tabs[0].value : ''
  const [selectedTab, setSelectedTab] = useState(defaultTabValue)
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedTabParam = searchParams.get('tab')

  useEffect(() => {
    if (!selectedTabParam) {
      setSearchParams(`tab=${defaultTabValue}`)
    } else {
      setSelectedTab(selectedTabParam)
    }
  }, [setSearchParams, selectedTabParam])

  const handleChangeTab = (tab: string) => {
    setSelectedTab(tab)
    setSearchParams(`tab=${tab}`)
  }

  return (
    <div className={classes.layout}>
      <Header
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={handleChangeTab}
      />
      <main className={classes.main}>
        {tabs && tabs.length > 0 ? (
          <LayoutTabContext.Provider value={selectedTab}>
            {children}
          </LayoutTabContext.Provider>
        ) : (
          children
        )}
      </main>
    </div>
  )
}
