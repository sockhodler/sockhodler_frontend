import React from "react";

import classes from "./Form.module.scss";

import {
  TextField,
  Select,
  Textarea,
  FilePicker,
  Checkbox,
  Button,
} from "components";

const metadataItems = [
  {
    label: "ARC3",
    value: "arc3",
  },
];

interface Props {
  onProcessClick?: () => void;
}

export const Form: React.FunctionComponent<Props> = ({ onProcessClick }) => {
  return (
    <div className={classes.form}>
      <div className={classes.row}>
        <TextField
          placeholder="SockHodler Genesis #001"
          label="Name"
          required
          accent="purple"
          size="large"
        />
        <TextField
          placeholder="SOXGEN"
          label="Unit Name"
          required
          accent="purple"
          size="large"
        />
      </div>

      <div className={classes.row}>
        <TextField
          placeholder="1"
          label="Quantity"
          required
          accent="purple"
          size="large"
          type="number"
        />
        <Select selected="ARC3" items={metadataItems} label="Metadata Format" />
        <TextField
          placeholder="5.0"
          label="Royalty (%)"
          accent="purple"
          size="large"
          type="number"
        />
      </div>

      <div className={classes.row}>
        <Textarea label="Description" required />

        <div className={classes.process}>
          <FilePicker
            className={classes["file-picker"]}
            label="Upload Traits"
            info={
              <>
                Upload .CSV File containing assets traits to be minted. An
                example template can be found
                <a href="#" className={classes["file-picker__link"]}>
                  here
                </a>
                .
              </>
            }
          />
          <Checkbox label="Is Video NFT?" className={classes.checkbox} />
          <Button
            accent="red"
            size="large"
            className={classes.action}
            onClick={onProcessClick}
          >
            PROCEED
          </Button>
        </div>
      </div>
    </div>
  );
};
