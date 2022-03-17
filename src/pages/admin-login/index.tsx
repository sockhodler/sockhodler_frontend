import React, { useEffect, useState } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Button, Layout, TextField } from "components";
import classes from "./index.module.scss";

import { ReactComponent as MyAlgoIcon } from "assets/icons/my-algo.svg";
import { ReactComponent as AlgoSignerIcon } from "assets/icons/algosigner.svg";
import { ReactComponent as PeraIcon } from "assets/icons/pera.svg";

export const AdminLogin: React.FunctionComponent = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const body = document.querySelector("body");
    body?.classList.add(classes["solid-body"]);

    return () => {
      body?.classList.remove(classes["solid-body"]);
    };
  }, []);

  return (
    <Layout noNav>
      <div className={classes.container}>
        <Carousel
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          showArrows={false}
          selectedItem={step}
        >
          <div className={classes.step}>
            <h2 className={classes.title}>Admin Panel</h2>
            <span className={classes.subtitle}>Login</span>

            <span className={classes.info}>
              LOGIN WITH YOUR PREFERRED WALLET
            </span>

            <div className={classes.wallets}>
              <button>
                <MyAlgoIcon />
              </button>
              <button>
                <AlgoSignerIcon />
              </button>
              <button>
                <PeraIcon />
              </button>
            </div>
          </div>

          <div className={classes.step}>
            <h2 className={classes.title}>Admin Panel</h2>
            <span className={classes.subtitle}>Login</span>

            <div className={classes.form}>
              <TextField placeholder="Username" />
              <TextField placeholder="Email" />
              <Button size="small" accent="gr-top-bottom">
                Continue
              </Button>
            </div>
          </div>
        </Carousel>
      </div>
    </Layout>
  );
};
