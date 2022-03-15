import React from "react";

import { Layout, Card, Button } from "components";
import classes from "./index.module.scss";
import classNames from "classnames";

interface ListProps {
  title: string;
  items: { title: string; value: string }[];
}

const List: React.FunctionComponent<ListProps> = ({ title, items }) => {
  return (
    <div className={classes.info}>
      <h2 className={classes.info__title}>{title}</h2>
      <ul className={classes.info__list}>
        {items.map((item) => (
          <li className={classes.info__item}>
            <span>{item.title}</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const NFTDetails: React.FunctionComponent = () => {
  const infoDetails = [
    {
      title: "Description",
      value:
        "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.",
    },
    {
      title: "Unit Name",
      value: "SOXGEN00",
    },
    {
      title: "Creator Address",
      value: "SOCKSV3B6CDAE5R4BS5RZYEVMC3UGR4N76C3C7UZQ6KTTPLTI7DSXWMX6Y",
    },
    {
      title: "Owner Address",
      value: "SOCKSV3B6CDAE5R4BS5RZYEVMC3UGR4N76C3C7UZQ6KTTPLTI7DSXWMX6Y",
    },
    {
      title: "Total Supply",
      value: "1",
    },
    {
      title: "Circulating Supply",
      value: "1",
    },
  ];

  const metadataDetails = [
    {
      title: "Royalty",
      value: "5%",
    },
    {
      title: "File Integrity",
      value: "sha-256-D0gC4Y0yihoK6cnVRqlrVX6nyLYR6DWgf71LQNZmAw=",
    },
    {
      title: "File Mime Type",
      value: "image/jpeg",
    },
    {
      title: "Asset URL",
      value:
        "https://sockhodler.mypinata.cloud/ipfs/QmYKd5A3ftcoiBz8hV6EF174GNeGDcmV2pi6xFKVTZrRxM",
    },
    {
      title: "Properties",
      value: "{“size”:60424}",
    },
    {
      title: "ASA Spec",
      value: "ARC3",
    },
  ];

  return (
    <Layout>
      <h2 className={classes.title}>NFT Details</h2>

      <div className={classes.grid}>
        <Card className={classNames(classes.left, classes.card)}>
          <List title="Diamond Retro Genesis" items={infoDetails} />
        </Card>

        <div className={classes.right}>
          <img
            src="https:/unsplash.it/500/500"
            alt=""
            className={classes.right__img}
          />
          <div className={classes.right__divider} />

          <Button className={classes.right__btn} accent="red">
            BACK TO MINTING PAGE
          </Button>
          <Button className={classes.right__btn} accent="grey">
            MINTED ASSET LIST
          </Button>
        </div>
      </div>

      <Card className={classes.card}>
        <List title="Metadata" items={metadataDetails} />
      </Card>
    </Layout>
  );
};
