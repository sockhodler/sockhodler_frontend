import React, { useState, forwardRef, useRef } from "react";

import classNames from "classnames";
import classes from "./Select.module.scss";
import { ReactComponent as ArrowDownIcon } from "assets/icons/arrow-down.svg";
import { ReactComponent as ChevronDownIcon } from "assets/icons/chevron-down.svg";
import { useOnClickOutside } from "hooks";

type Item = { label: string; value: string };

interface Props {
  placeholder?: string;
  items: Item[];
  label?: string;
  error?: boolean;
  onChange?: (item: Item, idx: number) => void;
  selected?: string;
  className?: string;
  accent?: "violet";
}

export const Select: React.FunctionComponent<Props> = forwardRef<
  HTMLSelectElement,
  Props
>(
  (
    { placeholder, items, label, error, onChange, selected, className, accent },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(selectRef, () => setIsOpen(false));

    // find selected
    const defaultSelected = items.find((item) => item.value === selected);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement> | string) => {
      const targetValue = typeof e === "string" ? e : e.target.value;
      // find object item index
      const targetIndex = items.findIndex((item) => item.value === targetValue);
      if (targetIndex !== -1) {
        onChange?.(items[targetIndex], targetIndex);
        setIsOpen(false);
      }
    };

    const handleSelectItem = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      value: string
    ) => {
      e.preventDefault();
      handleSelect(value);
    };

    const handleClickOnSelect = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      setIsOpen((op) => !op);
    };

    return (
      <div
        className={classNames(
          classes.container,
          isOpen && classes["container--open"],
          error && classes.error,
          accent && classes[`accent-${accent}`],
          className
        )}
        ref={selectRef}
      >
        {label && <span className={classes.label}>{label}</span>}

        <button className={classes.select} onClick={handleClickOnSelect}>
          {selected ? defaultSelected?.label : placeholder}
          {accent === "violet" ? <ChevronDownIcon /> : <ArrowDownIcon />}
        </button>

        <div className={classes.list}>
          {items.map((item) => (
            <button
              className={classes.item}
              key={item.value}
              onClick={(e) => handleSelectItem(e, item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <select
          ref={ref}
          onChange={(e) => handleSelect(e)}
          style={{ display: "none" }}
          defaultValue={selected}
        >
          {items.map((item) => (
            <option value={item.value} key={item.label}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
