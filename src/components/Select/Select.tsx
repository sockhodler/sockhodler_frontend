import React, { useState, forwardRef, useRef } from "react";

import classNames from "classnames";
import classes from "./Select.module.scss";
import { ReactComponent as ArrowDownIcon } from "assets/icons/arrow-down.svg";
import { useOnClickOutside } from "hooks";

type Item = { label: string; value: string };

interface Props {
  placeholder?: string;
  items: Item[];
  label?: string;
  error?: boolean;
  onChange?: (item: Item, idx: number) => void;
  selected?: string;
}

export const Select: React.FunctionComponent<Props> = forwardRef<
  HTMLSelectElement,
  Props
>(({ placeholder, items, label, error, onChange, selected }, ref) => {
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

  return (
    <div
      className={classNames(
        classes.container,
        isOpen && classes["container--open"],
        error && classes.error
      )}
      ref={selectRef}
    >
      {label && <span className={classes.label}>{label}</span>}

      <button className={classes.select} onClick={() => setIsOpen((op) => !op)}>
        {selected ? defaultSelected?.label : placeholder} <ArrowDownIcon />
      </button>

      <div className={classes.list}>
        {items.map((item) => (
          <button
            className={classes.item}
            key={item.value}
            onClick={() => handleSelect(item.value)}
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
});
