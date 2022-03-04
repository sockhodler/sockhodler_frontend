import React from 'react'

import { Layout } from 'components'
import { AuthenticateTab, DashboardTab } from './page-components'

export const Home: React.FunctionComponent = () => {
  return (
    <Layout
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
    </Layout>
  )
}
