import React from 'react'

import { BaseModal } from 'components'

import classes from './ConnectWalletModal.module.scss'

interface Props {
  isOpen: boolean
  onClose: () => void
  wallets: { icon: string; label: string; id: string }[]
  onWalletClick: (id: string) => void
}

export const ConnectWalletModal: React.FunctionComponent<Props> = ({
  isOpen,
  onClose,
  wallets,
  onWalletClick,
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className={classes.modal}
      hideHeader
    >
      <div className={classes.header}>
        <h3>Connect your wallet</h3>
        <span>Select what wallet you want to connect below</span>
      </div>

      <div className={classes.grid}>
        {wallets.map((wallet) => (
          <button
            className={classes.wallet}
            key={wallet.id}
            onClick={() => onWalletClick(wallet.id)}
          >
            <img src={wallet.icon} alt="" />
            <span>{wallet.label}</span>
          </button>
        ))}
      </div>
    </BaseModal>
  )
}
