import React from 'react'

import classes from './StakingGrid.module.scss'
import { StakingItem, TextField, Switch } from 'components'
import { StakingItemProps } from 'components/StakingItem/StakingItem'

interface Props {
  list: StakingItemProps[]
}

export const StakingGrid: React.FunctionComponent<Props> = ({ list }) => {
  return (
    <div className={classes.grid}>
      <div className={classes.header}>
        <TextField placeholder="SEARCH" className={classes.header__search} />
        <Switch label="STAKED" />
      </div>

      <div className={classes.list}>
        {list.map((item) => (
          <StakingItem {...item} />
        ))}
      </div>
    </div>
  )
}
