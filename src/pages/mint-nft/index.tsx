import React from "react";

import { Layout, AdminPanelLoginModal } from "components";
import { MintCard } from "./page-components";
import classes from "./index.module.scss";

export const MintNFT: React.FunctionComponent = () => {
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
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
        eligendi, quaerat voluptates modi aliquam beatae expedita officia,
        molestias corrupti id, quis sequi amet? Autem inventore rerum molestias
        incidunt provident dolores.
      </MintCard>

      {/* <AdminPanelLoginModal isOpen onClose={() => console.log("on close")} /> */}
    </Layout>
  );
};
