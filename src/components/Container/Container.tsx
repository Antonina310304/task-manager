import React, { ReactNode, memo } from 'react';

import cn from 'classnames';
import styles from './Container.module.css';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container = ({ className, children }: ContainerProps) => (
  <div className={cn(styles.container, className)}>
    {children}
  </div>
);

export default memo(Container);
