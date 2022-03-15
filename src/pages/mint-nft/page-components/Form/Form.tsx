import React from "react";

import classes from "./Form.module.scss";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  {
    label: "ARC69",
    value: "arc69",
  },
];

export interface FormInputs {
  name: string;
  unitName: string;
  quantity: string;
  royalty: string;
  description: string;
  isNFT?: boolean;
  metadataFormat: { label: string; value: string };
  file: File;
}

interface Props {
  onSubmit: (data: FormInputs) => void;
}

const schema = yup
  .object({
    name: yup.string().required(),
    unitName: yup.string().required(),
    quantity: yup.number().positive().integer().required(),
    royalty: yup.number().positive().integer().required(),
    description: yup.string().required(),
    isNFT: yup.boolean().required(),
    metadataFormat: yup
      .object({ label: yup.string(), value: yup.string() })
      .required(),
    // file: yup.object().shape({
    //   file: yup.mixed().required(),
    // }),
  })
  .required();

export const Form: React.FunctionComponent<Props> = ({
  onSubmit: onFormSuccessSubmit,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormInputs) => {
    onFormSuccessSubmit(data);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.row}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              placeholder="SockHodler Genesis #001"
              label="Name"
              required
              accent="purple"
              size="large"
              error={!!errors.name}
              {...field}
            />
          )}
        />

        <Controller
          name="unitName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              placeholder="SOXGEN"
              label="Unit Name"
              required
              accent="purple"
              size="large"
              error={!!errors.unitName}
              {...field}
            />
          )}
        />
      </div>

      <div className={classes.row}>
        <Controller
          name="quantity"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              placeholder="1"
              label="Quantity"
              required
              accent="purple"
              size="large"
              type="number"
              error={!!errors.quantity}
              {...field}
            />
          )}
        />

        <Controller
          name="metadataFormat"
          control={control}
          defaultValue={metadataItems[0]}
          render={({ field }) => (
            <Select
              items={metadataItems}
              selected={metadataItems[0].value}
              label="Metadata Format"
              error={!!errors.metadataFormat}
              {...field}
            />
          )}
        />

        <Controller
          name="royalty"
          control={control}
          defaultValue="5.0"
          render={({ field }) => (
            <TextField
              placeholder="5.0"
              label="Royalty (%)"
              accent="purple"
              size="large"
              type="number"
              error={!!errors.royalty}
              {...field}
            />
          )}
        />
      </div>

      <div className={classes.row}>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Textarea
              label="Description"
              required
              error={!!errors.description}
              {...field}
            />
          )}
        />

        <div className={classes.process}>
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <FilePicker
                className={classes["file-picker"]}
                label="Upload Traits"
                info={
                  <>
                    Upload .CSV File containing assets traits to be minted. An
                    example template can be found{" "}
                    <a href="#" className={classes["file-picker__link"]}>
                      here
                    </a>
                    .
                  </>
                }
                error={!!errors.file}
                {...field}
              />
            )}
          />

          <Controller
            name="isNFT"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                label="Is Video NFT?"
                className={classes.checkbox}
                {...field}
              />
            )}
          />

          <Button
            accent="red"
            size="large"
            className={classes.action}
            type="submit"
          >
            PROCEED
          </Button>
        </div>
      </div>
    </form>
  );
};
