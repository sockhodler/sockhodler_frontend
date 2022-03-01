import React from 'react'

import { LayoutTab, Button } from 'components'

interface Props {
  for: string
}

export const DashboardTab: React.FunctionComponent<Props> = ({
  for: tabFor,
}) => {
  return (
    <LayoutTab for={tabFor}>
      <h1>Welcome back</h1>
      <Button>CLAIM DAILY SCAN REWARDS</Button>
    </LayoutTab>
  )
}
