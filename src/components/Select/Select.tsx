import React, { useState } from "react";

import classNames from "classnames";
import classes from "./Select.module.scss";
import { ReactComponent as ChevronDownIcon } from "assets/icons/chevron-down.svg";

type Item = { label: string; value: string };

interface Props {
  selected?: string;
  placeholder?: string;
  items: Item[];
  onClickItem?: (item: Item, idx: number) => void;
  label?: string;
}

export const Select: React.FunctionComponent<Props> = ({
  selected,
  placeholder,
  items,
  onClickItem,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOnItem = (item: Item, idx: number) => {
    onClickItem?.(item, idx);
    setIsOpen(false);
  };

  return (
    <div
      className={classNames(
        classes.container,
        isOpen && classes["container--open"]
      )}
    >
      {label && <span className={classes.label}>{label}</span>}

      <button className={classes.select} onClick={() => setIsOpen((op) => !op)}>
        {selected ?? placeholder}... <ChevronDownIcon />
      </button>

      <div className={classes.list}>
        {items.map((item, idx) => (
          <button
            className={classes.item}
            key={item.value}
            onClick={() => handleClickOnItem(item, idx)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
