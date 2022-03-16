import React, { useState } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Layout, AdminPanelLoginModal } from "components";
import { MintCard, Form, UploadMedia, Success } from "./page-components";
import { imageIntegrity, NFT, NFTMetadata } from "utils/nft";
import classes from "./index.module.scss";

// types
import { FormInputs } from "./page-components/Form/Form";

export const MintNFT: React.FunctionComponent = () => {
  const [step, setStep] = useState(0);
  const [meta, setMeta] = useState(new NFTMetadata());

  const onFormSubmit = (md: NFTMetadata) => {
    console.log(md);
    setMeta(md);
    setStep(1);
  };

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

      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        showArrows={false}
        selectedItem={step}
        // dynamicHeight
      >
        <Form onSubmit={onFormSubmit} />
        {/* <UploadMedia onMintClick={() => setStep(2)} /> */}
        <MintCard img="https://unsplash.it/200/200">
          <Success onBackClick={() => setStep(0)} />
        </MintCard>
      </Carousel>

      {/* <AdminPanelLoginModal isOpen onClose={() => console.log("on close")} /> */}
    </Layout>
  );
};
