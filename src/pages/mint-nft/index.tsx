import React, { useState } from "react";

import { Layout, AdminPanelLoginModal } from "components";
import { MintCard, Form, UploadMedia, Success } from "./page-components";
import classes from "./index.module.scss";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export const MintNFT: React.FunctionComponent = () => {
  const [step, setStep] = useState(0);

  return (
    <Layout noNav>
      <div className={classes.header}>
        <h1 className={classes.title}>Mint NFT</h1>
        <div className={classes.accepts}>
          <span>ACCEPTS STILL IMAGE OF VIDEO FILES</span>
          <span>FILE TYPES SUPPORTED</span>
          <span>JPG, PNG, GIF, SVG, MP4, WEBM</span>
        </div>
      </div>

      <MintCard img="https://unsplash.it/200/200">
        <Carousel
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          showArrows={false}
          selectedItem={step}
          dynamicHeight
        >
          <Form onProcessClick={() => setStep(1)} />
          <UploadMedia onMintClick={() => setStep(2)} />
          <Success onBackClick={() => setStep(0)} />
        </Carousel>
      </MintCard>

      {/* <AdminPanelLoginModal isOpen onClose={() => console.log("on close")} /> */}
    </Layout>
  );
};
