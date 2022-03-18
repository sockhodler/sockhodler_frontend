import React, { useState } from "react";

import classes from "./Form.module.scss";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SessionWallet } from "algorand-session-wallet";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { imageIntegrity, NFT, NFTMetadata } from "utils/nft";
import { putToPinata, putToIPFS } from "utils/ipfs";
import {
  TextField,
  Select,
  Textarea,
  FilePicker,
  Checkbox,
  Button,
  Card,
  MediaPicker,
} from "components";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { setSendTransactionHeaders } from "algosdk/dist/types/src/client/v2/algod/sendRawTransaction";

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
  mediaPicker: File;
  name: string;
  unitName: string;
  quantity: string;
  royalty: string;
  description: string;
  isNFT?: boolean;
  metadataFormat: { label: string; value: string };
  // file: File;
}
interface Props {
  onSubmit: (data: NFTMetadata) => void;
}

const schema = yup
  .object({
    mediaPicker: yup
      .mixed()
      .test("required", "You need to provide a file", (value) => {
        return value && value.size > 0;
      })
      .test("fileSize", "The file is too large", (value) => {
        return value && value.size <= 2097152; // sample, 2MB
      }),
    name: yup.string().required(),
    unitName: yup.string().required(),
    quantity: yup.number().positive().integer().required(),
    royalty: yup.number().positive().integer().required(),
    description: yup.string().required(),
    isNFT: yup.boolean().required(),
    metadataFormat: yup
      .object({ label: yup.string(), value: yup.string() })
      .required(),
    /* file: yup
      .mixed()
      .test("required", "You need to provide a file", (value) => {
        return value && value.length;
      })
      .test("fileSize", "The file is too large", (value) => {
        return value && value[0] && value[0].size <= 2097152; // sample, 2MB
      }), */
  })
  .required();

const STATUS = {
  idle: "idle",
  pending: "pending",
  resolved: "resolved",
  rejected: "rejected",
};

export const Form: React.FunctionComponent<Props> = ({
  onSubmit: onFormSuccessSubmit,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const sw: SessionWallet = useSelector(
    (state: RootState) => state.wallets.sessionWallet
  );
  const navigate = useNavigate();
  const [meta, setMeta] = useState(new NFTMetadata());
  const [fileObj, setFileObj] = useState<File | null>();

  const setFile = (file: File | null) => {
    setFileObj(file);

    if (file) {
      setMeta(
        (meta) =>
          new NFTMetadata({
            ...meta,
            image: file.name,
            image_mimetype: file.type,
            properties: { ...meta.properties, size: file.size },
          })
      );
    }
  };
  const clearFile = () => {
    setFileObj(null);
    setMeta(new NFTMetadata());
  };
  const handleSetNFT = (nft: NFT) => {
    navigate(`/nft-details/${nft.token?.id}`);
  };
  const [metadataFormat, setMetadataFormat] = useState(metadataItems[0]);
  const [status, setStatus] = useState(STATUS.idle);

  const captureMetadata = (values: FormInputs) => {
    // const eprops = values.mints.reduce(
    //   (all, ep) => ({ ...all, [ep.name]: ep.value }),
    //   {}
    // )
    return new NFTMetadata({
      name: values.name,
      unitName: values.unitName,
      description: values.description,
      royalty: values.royalty,
      total: values.quantity,
      isVideoNFT: values.isNFT,
      // properties: { ...eprops, ...meta.properties },
    });
  };
  const onSubmit = async (data: FormInputs) => {
    setStatus(STATUS.pending);

    const md = captureMetadata(data);
    if (fileObj) {
      md.image_integrity = await imageIntegrity(fileObj);
      setMeta(md);
      const cid = await putToIPFS(fileObj, md);
      if (cid) {
        try {
          const nft: NFT = await NFT.create(sw.wallet, md, cid);
          setStatus(STATUS.resolved);
          handleSetNFT(nft);
        } catch (error) {
          setStatus(STATUS.rejected);
          console.log("error", error);
        }
      }
    }

    // setTimeout(() => {
    //   setStatus(STATUS.resolved);
    //   onFormSuccessSubmit(md);
    // }, 2000);
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="mediaPicker"
            control={control}
            render={({ field }) => (
              <MediaPicker
                className={classes["image-picker"]}
                error={!!errors.mediaPicker}
                clearFile={clearFile}
                setFile={setFile}
                {...field}
              />
            )}
          />

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
              render={({ field: { onChange, value } }) => (
                <Select
                  items={metadataItems}
                  selected={value.value}
                  onChange={(item) => {
                    onChange(item);
                    setMetadataFormat(item);
                  }}
                  label="Metadata Format"
                  error={!!errors.metadataFormat}
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
              {/* <Controller
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
          /> */}

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
              {/* <Controller
                name="isNFT"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Button
                    accent="red"
                    size="large"
                    className={classes.action}
                    type="submit"
                    disabled={metadataFormat.value === "arc69"}
                    tooltip={
                      metadataFormat.value === "arc69"
                        ? "arc69 is not available for now, coming soon"
                        : ""
                    }
                    {...field}
                  >
                    PROCEED
                  </Button>
                )}
              />
              <input type="submit" /> */}
              <Button
                accent="red"
                size="large"
                className={classes.action}
                type="submit"
                disabled={
                  metadataFormat.value === "arc69" || status === STATUS.pending
                }
                tooltip={
                  metadataFormat.value === "arc69"
                    ? "arc69 is not available for now, coming soon"
                    : ""
                }
                loading={status === STATUS.pending}
              >
                PROCEED
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
