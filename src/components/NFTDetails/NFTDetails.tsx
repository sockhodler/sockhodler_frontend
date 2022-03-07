import React from 'react'

import { Link } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from 'assets/icons/arrow-right.svg'
import { Card, Accordion, NFTInfo, Button } from 'components'
import classes from './NFTDetails.module.scss'

interface Props {
  back: { label: string; to: string }
  details: { name: string; value: string; to: string }[]
  faqItems?: { title: string; body: string; isOpen?: boolean }[]
  imgSrc: string
  actionLabel: string
  onActionClick: () => void
  title: string
  info: { title?: string; value: string | JSX.Element }[]
}

export const NFTDetails: React.FunctionComponent<Props> = ({
  back,
  details,
  faqItems,
  imgSrc,
  actionLabel,
  onActionClick,
  title,
  info,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.nav}>
        <Link to={back.to}>
          <ArrowRightIcon />
          <span>{back.label}</span>
        </Link>
      </div>

      <Card className={classes.nft}>
        <div className={classes.header}>{title}</div>

        <div className={classes.left}>
          <img src={imgSrc} alt="" className={classes.img} />
          {faqItems && faqItems.length > 0 ? (
            <div className={classes['faq-list']}>
              {faqItems.map((faq) => (
                <Accordion
                  title={faq.title}
                  body={faq.body}
                  isOpen={faq.isOpen}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className={classes.right}>
          <Button size="large" accent="red" onClick={onActionClick}>
            {actionLabel}
          </Button>
          <Card className={classes.info}>
            {info.map((item) => (
              <div className={classes.info__item} key={item.title}>
                {item.title ? (
                  <>
                    <span>{item.title}</span>
                    {typeof item.value === 'string' ? (
                      <span>{item.value}</span>
                    ) : (
                      item.value
                    )}
                  </>
                ) : (
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat.
                  </p>
                )}
              </div>
            ))}
          </Card>

          <div className={classes.details}>
            {details.map((detail) => (
              <NFTInfo
                key={detail.name}
                name={detail.name}
                value={detail.value}
                to={detail.to}
                size="small"
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
