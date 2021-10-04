import React from "react";
import { memo } from "react";
import { InputType } from "../../types";

import styles from "./Input.module.css";

interface InputProps {
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  type: InputType;
  value?: string;
  inputName?: string;
  onFocus?: () => void;
  onBlur?: (event: { target: any }) => void;
  onChange?: (event: { target: any }) => void;
}

const Input = ({
  disabled,
  inputName,
  value,
  placeholder,
  defaultValue,
  onFocus,
  onBlur,
  onChange,
  type,
}: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        name={inputName}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        type={type ? type : "text"}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  );
};

export default memo(Input);
