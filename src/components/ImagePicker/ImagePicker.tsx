import React, { useState, forwardRef } from "react";

import classes from "./ImagePicker.module.scss";

import DefaultImage from "assets/images/image-picker-default.png";
import classNames from "classnames";
import { ReactComponent as CloseIcon } from "assets/icons/close.svg";

interface Props {
  onChange: (file: File | null) => void;
  className?: string;
  error?: boolean;
}

export const ImagePicker: React.FunctionComponent<Props> = forwardRef<
  HTMLInputElement,
  Props
>(({ onChange, className, error }, ref) => {
  const randomId = `image-picker-${Math.random()}`;
  const [img, setImg] = useState("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files.item(0);
      event.target.value = "";

      onChange(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImg(e.target.result);
      };
      // @ts-ignore
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    onChange(null);
    setImg("");
  };

  return (
    <div
      className={classNames(
        classes.container,
        error && classes.error,
        className
      )}
    >
      <div
        className={classNames(
          classes["image-preview"],
          img && classes["image-preview--visible"]
        )}
      >
        <button className={classes.remove} onClick={handleRemoveFile}>
          <CloseIcon />
        </button>

        <img src={img} alt="" />
      </div>

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={randomId} className={classes.label}>
        <img src={DefaultImage} alt="" />
      </label>

      <input
        type="file"
        id={randomId}
        onChange={handleOnChange}
        style={{ display: "none" }}
        accept="audio/*, video/*, image/*"
        ref={ref}
      />
    </div>
  );
});
