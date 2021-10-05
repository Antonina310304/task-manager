import React, { ReactNode, memo } from 'react';

import cn from 'classnames';
import styles from './Container.module.css';

interface IContainer {
  className?: string;
  children: ReactNode;
}

const Container = ({ className, children }: IContainer) => (
  <div className={cn(styles.container, className)}>
    {children}
  </div>
);

export default memo(Container);
