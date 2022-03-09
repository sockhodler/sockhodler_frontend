import React, { useEffect } from 'react'

import Modal from 'react-modal'

import classNames from 'classnames'

import classes from './Base.module.scss'

Modal.setAppElement('#root')

interface Props {
  isOpen: boolean
  onClose: () => void
  className?: string
  overlayClassName?: string
  title?: string
  hideHeader?: boolean
}

export const BaseModal: React.FunctionComponent<Props> = ({
  isOpen,
  onClose,
  children,
  className,
  overlayClassName,
  title,
  hideHeader,
}) => {
  useEffect(() => {
    // @ts-ignore: Unreachable code error
    document.addEventListener('keyup', handleCloseModalOnEsc)

    return () => {
      // @ts-ignore: Unreachable code error
      document.removeEventListener('keyup', handleCloseModalOnEsc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCloseModalOnEsc = (e: React.KeyboardEvent) => {
    if (e.code === 'Escape') {
      onClose()
    }
  }

  const handleCloseModal = (e: React.MouseEvent) => {
    if ((e.target as Element).className.includes('ReactModal__Overlay')) {
      onClose()
    }
  }

  return (
    <Modal
      closeTimeoutMS={300}
      isOpen={isOpen}
      className={classNames(
        classes.modal,
        hideHeader && classes['modal--hide-header'],
        className,
      )}
      overlayClassName={classNames(classes.overlay, overlayClassName)}
      onRequestClose={handleCloseModal}
    >
      {!hideHeader && (
        <div className={classes.header}>
          <h3>{title}</h3>
        </div>
      )}

      <div className={classes.content}>{children}</div>
    </Modal>
  )
}
