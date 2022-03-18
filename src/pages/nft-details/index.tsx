import React, { useState, useEffect } from "react";

import { Layout, Card, Button } from "components";
import { useParams } from "react-router-dom";
import { NFT, NFTMetadata } from "utils/nft";
import classes from "./index.module.scss";
import classNames from "classnames";
import { validateArc3 } from "utils/validator";
import { Icon } from "@blueprintjs/core";

interface InfoDetailProps {
  title: string;
  value: string | number;
}
interface ListProps {
  title: string;
  items: InfoDetailProps[];
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
  const { assetId } = useParams();
  const [nft, setNFT] = useState(new NFT(new NFTMetadata()));
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    setLoaded(false);

    let subscribed = true;
    if (assetId) {
      NFT.fromAssetId(Number(assetId))
        .then((nft) => {
          if (!subscribed) return;

          setNFT(nft);
          setLoaded(true);
        })
        .catch((err) => {
          console.log("error", err);
          setLoaded(true);
        });

      return () => {
        subscribed = false;
      };
    }
  }, [assetId]);

  let img = <div />;
  let meta = <div />;
  let arc3Tests = <div />;
  let infoHero = <div />;

  if (loaded) {
    img = <img alt="nft" src={nft.imgURL()} className={classes.right__img} />;
    if (nft.token) {
      const { name, unitName, total, creator } = nft.token;
      const details = [
        {
          title: "Name",
          value: name,
        },
        {
          title: "Unit Name",
          value: unitName,
        },
        {
          title: "Creator Address",
          value: creator,
        },
        {
          title: "Owner Address",
          value: creator,
        },
        {
          title: "Total Supply",
          value: total,
        },
        {
          title: "Circulating Supply",
          value: "1",
        },
      ];

      infoHero = (
        <div className={classes.info}>
          <h2 className={classes.info__title}>Hero Details</h2>
          <ul className={classes.info__list}>
            {details.map((item) => (
              <li className={classes.info__item}>
                <span>{item.title}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    const mdProps = nft.metadata
      ? Object.keys(nft.metadata).map((key, idx) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let prop = (nft.metadata as any)[key];
          if (prop === undefined) {
            prop = "";
          }
          if (typeof prop === "object") {
            prop = JSON.stringify(prop);
          }
          return (
            <li className={classes.info__item} key={idx}>
              <span>{key}</span>
              <span>{prop.toString()}</span>
            </li>
          );
        })
      : [<li key="none">No metadata</li>];

    const arc3Invalids = validateArc3(nft).map((test) => {
      if (test.pass)
        return (
          <li key={test.name}>
            {" "}
            <Icon icon="tick" intent="success" /> <b>{test.name}</b>
          </li>
        );

      return (
        <li key={test.name}>
          {" "}
          <Icon icon="cross" intent="danger" /> <b>{test.name}</b>{" "}
        </li>
      );
    });

    arc3Tests = (
      <div className={classes["list-container"]}>
        <h5 className={classes["list-title"]}>ARC3 Tests</h5>{" "}
        <ul className={classes.list}>{arc3Invalids}</ul>
      </div>
    );

    meta = (
      <div className={classes.info}>
        <h2 className={classes.info__title}>Metadata</h2>
        <ul className={classes.info__list}>{mdProps}</ul>
      </div>
    );
  }

  return (
    <Layout>
      <h2 className={classes.title}>NFT Details</h2>

      <div className={classes.grid}>
        <Card className={classNames(classes.left, classes.card)}>
          {infoHero}
        </Card>

        <div className={classes.right}>
          {img}
          <div className={classes.right__divider} />

          <Button className={classes.right__btn} accent="red">
            BACK TO MINTING PAGE
          </Button>
          <Button className={classes.right__btn} accent="grey">
            MINTED ASSET LIST
          </Button>
        </div>
      </div>

      <Card className={classes.card}>{meta}</Card>
    </Layout>
  );
};
