import React, { memo } from "react";
import styles from "./FormError.module.css";
import cn from "classnames";

export interface FormErrorProps {
  className?: string;
  textError?: string;
}

const FormError = ({ className, textError }: FormErrorProps) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <p className={styles.error}>
        {textError ? textError : "Заполните поле корректно!"}
      </p>
    </div>
  );
};

export default memo(FormError);
