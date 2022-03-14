import React from "react";

import classes from "./UploadMedia.module.scss";
import { FilePicker, Button } from "components";

interface Props {
  onMintClick?: () => void;
}

export const UploadMedia: React.FunctionComponent<Props> = ({
  onMintClick,
}) => {
  return (
    <div className={classes.upload}>
      <FilePicker
        className={classes["file-picker"]}
        label="Upload Traits"
        info={
          <>
            <span className={classes["file-picker__name"]}>test.mp4</span>{" "}
            Uploaded Successfully
          </>
        }
      />
      <div className={classes.divider} />
      <Button className={classes.btn} accent="red" onClick={onMintClick}>
        MINT NFT
      </Button>
    </div>
  );
};
