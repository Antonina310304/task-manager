import React, { memo } from "react";
import cn from "classnames";
import styles from "./Button.module.css";

export interface ButtonType {
  className?: string;
  children: string;
  view: "change" | "delete";
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  className,
  disabled,
  children,
  view,
  onClick,
}: ButtonType) => {
  return (
    <button
      disabled={disabled}
      className={cn(styles.button, className, {
        [styles.change]: view === "change",
        [styles.delete]: view === "delete",
      })}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
};

export default memo(Button);
