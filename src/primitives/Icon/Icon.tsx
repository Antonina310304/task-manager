import React, { memo } from 'react';
import cn from 'classnames';
import { IconType } from '../../types';
import styles from './Icon.module.css';
import close from './icons/close.svg';

export interface IconProps {
  className?: string;
  icon: IconType;
  height?: number,
  width?: number
}

const Icon = ({
  className, icon, width, height,
}: IconProps) => (
  <div className={cn(className, styles.icon, { [styles.close]: icon === 'close' })}>
    <svg
      width={width} height={height}
      className={styles.svg}
    >
      <use xlinkHref={`${close}#${icon}`} />
    </svg>
  </div>
);

export default memo(Icon);
