import React, { memo, ReactNode } from 'react';
import cn from 'classnames';
import styles from './Button.module.css';

export interface ButtonType {
  className?: string;
  children: ReactNode;
  view: 'change' | 'delete' | 'icon';
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  className,
  disabled,
  children,
  view,
  onClick,
}: ButtonType) => (
  <button
    disabled={disabled}
    className={cn(styles.button, className, {
      [styles.change]: view === 'change',
      [styles.delete]: view === 'delete',
      [styles.icon]: view === 'icon',
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

export default memo(Button);
