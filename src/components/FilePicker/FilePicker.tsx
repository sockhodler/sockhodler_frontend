import React, { forwardRef, useState } from "react";
import classNames from "classnames";
import classes from "./FilePicker.module.scss";
import { Button } from "components";
import { formatBytes } from "utils/helpers";

interface Props {
  onChange?: (file: FileList) => void;
  className?: string;
  label?: string;
  required?: boolean;
  info?: string | JSX.Element;
  error?: boolean;
}

const STATUS = {
  idle: "idle",
  uploading: "uploading",
  resolved: "resolved",
  rejected: "rejected",
};

export const FilePicker: React.FunctionComponent<Props> = forwardRef<
  HTMLInputElement,
  Props
>(({ onChange, className, label, required, info, error }, ref) => {
  const randomId = `file-picker-${Math.random()}`;
  const [fileInfo, setFileInfo] = useState<File | null>(null);
  const [status, setStatus] = useState(STATUS.idle);

  const handleOpenFilePicker = () => {
    const targetInput = document.getElementById(randomId) as HTMLInputElement;
    targetInput?.click();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileInfo(e.target.files[0]);
      onChange?.(e.target.files);
    }
  };

  return (
    <div
      className={classNames(
        classes.container,
        error && classes.error,
        className
      )}
    >
      {label && (
        <label className={classes.label} htmlFor={randomId}>
          {label} {required && <span>*</span>}
        </label>
      )}
      <input
        className={classes.input}
        type="file"
        onChange={handleOnChange}
        id={randomId}
        ref={ref}
      />
      <Button
        accent="gr-top-bottom"
        className={classes.btn}
        onClick={handleOpenFilePicker}
      >
        BROWSE
      </Button>
      {info && <p className={classes.info}>{info}</p>}

      {fileInfo && (
        <div className={classes["upload-details"]}>
          <div className={classes["upload-details__detail"]}>
            <span>Name:</span>
            <span>{fileInfo.name}</span>
          </div>
          <div className={classes["upload-details__detail"]}>
            <span>Size:</span>
            <span>{formatBytes(fileInfo.size, 2)}</span>
          </div>
          <div className={classes["upload-details__detail"]}>
            <span>File type:</span>
            <span>{fileInfo.type}</span>
          </div>
        </div>
      )}
    </div>
  );
});
