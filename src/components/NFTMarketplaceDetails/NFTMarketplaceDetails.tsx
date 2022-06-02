import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "assets/icons/arrow-right.svg";
import { Card, NFTInfo, Button, Select } from "components";
import classes from "./NFTMarketplaceDetails.module.scss";
import classNames from "classnames";

const paySelectItems = [
  {
    label: "SOCKS Tokens",
    value: "socks-tokens",
  },
  {
    label: "ALGO",
    value: "algo",
  },
];

interface Props {
  back: { label: string; to: string };
  details: { name: string; value: string; to: string }[];
  imgSrc: string;
  actionLabel: string;
  onActionClick: () => void;
  title: string;
  info: { title?: string; value: string | JSX.Element }[];
}

export const NFTMarketplaceDetails: React.FunctionComponent<Props> = ({
  back,
  details,
  imgSrc,
  actionLabel,
  onActionClick,
  title,
  info,
}) => {
  const [selectedPay, setSelectedPay] = useState("");

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

        <img src={imgSrc} alt="" className={classes.img} />

        <div className={classes.actions}>
          <Button
            size="large"
            accent="red"
            onClick={onActionClick}
            disabled={selectedPay.length === 0}
            className={classNames(
              selectedPay.length === 0 && classes["actions__cta--disabled"]
            )}
          >
            {actionLabel}
          </Button>

          <Select
            selected={selectedPay}
            items={paySelectItems}
            onChange={(item: any) => setSelectedPay(item.value)}
            className={classes.actions__select}
            placeholder="Select your currency"
            accent="violet"
            label="Pay With"
          />
        </div>

        <Card className={classes.info}>
          {info.map((item) => (
            <div className={classes.info__item} key={item.title}>
              {item.title ? (
                <>
                  <span>{item.title}</span>
                  {typeof item.value === "string" ? (
                    <span>{item.value}</span>
                  ) : (
                    item.value
                  )}
                </>
              ) : (
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                  aliquip ex ea commodo consequat.
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
      </Card>
    </div>
  );
};
