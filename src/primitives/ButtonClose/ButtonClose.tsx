import React, { memo, ReactNode } from 'react';

import cn from 'classnames';
import styles from './ButtonClose.module.css';

export interface ButtonCloseType {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

const ButtonClose = ({ className, onClick, children }: ButtonCloseType) => (
  <button onClick={onClick} className={cn(className, styles.button)} type='button'>
    {children}
  </button>
);

export default memo(ButtonClose);
