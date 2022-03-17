import React, { useState, forwardRef } from "react";

import classes from "./MediaPicker.module.scss";

import classNames from "classnames";
import { ReactComponent as CloseIcon } from "assets/icons/close.svg";
import { ReactComponent as ImageIcon } from "assets/icons/image.svg";

interface Props {
  onChange: (file: File | null) => void;
  className?: string;
  error?: boolean;
  clearFile: () => void;
  setFile: (file: File | null) => void;
}

export const MediaPicker: React.FunctionComponent<Props> = forwardRef<
  HTMLInputElement,
  Props
>(({ onChange, className, error, clearFile, setFile }, ref) => {
  const randomId = `image-picker-${Math.random()}`;
  const [img, setImg] = useState("");
  const [mediaType, setMediaType] = useState("image");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files.item(0);
      event.target.value = "";

      setFile(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImg(e.target.result);
        if (file) setMediaType(file.type.split("/")[0]);
      };
      // @ts-ignore
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    clearFile();
    setImg("");
    setMediaType("image");
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

        {mediaType === "image" && <img src={img} alt="" />}
        {mediaType === "video" && (
          <video preload="auto" autoPlay loop muted>
            <source src={img} type="video/mp4" />
          </video>
        )}
      </div>

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={randomId} className={classes.label}>
        <ImageIcon />
        <span>Click here to select a file</span>
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
