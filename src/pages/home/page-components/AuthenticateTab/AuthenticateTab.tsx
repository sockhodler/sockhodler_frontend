import React from 'react'

import { LayoutTab } from 'components'

interface Props {
  for: string
}

export const AuthenticateTab: React.FunctionComponent<Props> = ({
  for: tabFor,
}) => {
  return <LayoutTab for={tabFor}>AuthenticateTab</LayoutTab>
}
