import React from 'react'

import { LayoutTabs } from 'components'
import { AuthenticateTab, DashboardTab } from './page-components'

export const Home: React.FunctionComponent = () => {
  return (
    <div>
      <LayoutTabs
        tabs={[
          {
            label: 'Authenticate',
            value: 'authenticate',
          },
          {
            label: 'Dashboard',
            value: 'dashboard',
          },
        ]}
      >
        <AuthenticateTab for="authenticate" />
        <DashboardTab for="dashboard" />
      </LayoutTabs>
    </div>
  )
}
