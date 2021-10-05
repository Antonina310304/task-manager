import React, { memo } from 'react';

import styles from './Select.module.css';
import { StatusTypeProps } from '../../static/statusType';
import { TaskStatusData } from '../../types';

export interface SelectProps {
  className?: string;
  name: string;
  defaultValue: string;
  values: StatusTypeProps;
  onChange?: (arg: React.FormEvent) => void;
}

const Select = ({
  className,
  name,
  defaultValue,
  values,
  onChange,
}: SelectProps) => (
    <div className={className}>
      <select
        className={styles.select}
        data-name={name}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {Object.keys(values).map((item) => (
          <option key={item} value={item}>
            {values[item as TaskStatusData]}
          </option>
        ))}
      </select>
    </div>
);

export default memo(Select);
