import React from "react";

import classes from "./AssetsList.module.scss";
import { Card, Button } from "components";

interface Item {
  img: string;
  title: string;
  details: {
    label: string;
    value: string;
  }[];
}

interface Props {
  items: Item[];
}

export const AssetsList: React.FunctionComponent<Props> = ({ items }) => {
  return (
    <Card className={classes.card}>
      <ul className={classes.list}>
        {items.map((item) => (
          <li className={classes.item} key={item.title}>
            <img src={item.img} alt="" className={classes.img} />
            <div className={classes.info}>
              <span className={classes.info__title}>{item.title}</span>
              <div className={classes.info__details}>
                {item.details.map((detail) => (
                  <div className={classes.info__detail} key={detail.label}>
                    <span>{detail.label}</span>
                    <span>{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <Button accent="red" className={classes.btn}>
              View NFT
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
};
