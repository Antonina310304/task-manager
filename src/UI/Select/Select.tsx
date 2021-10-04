import React, { memo, useCallback } from "react";

import styles from "./Select.module.css";

export interface SelectProps {
  className?: string;
  name: string;
  defaultValue: string;
  values: any;
  onChange?: (arg: any) => void;
}

const Select = ({
  className,
  name,
  defaultValue,
  values,
  onChange,
}: SelectProps) => {
  const handleChange = useCallback(
    (e) => {
      if (onChange) {
        onChange(e.target.value);
      }
    },
    [onChange]
  );

  return (
    <div className={className}>
      <select
        className={styles.select}
        data-name={name}
        name={name}
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        {Object.keys(values).map((item) => (
          <option key={item} value={item}>
            {values[item as any]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(Select);
