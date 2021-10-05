import React, { memo } from 'react';
import cn from 'classnames';
import styles from './Icon.module.css';
import iconsType from '../../static/icons';
import icons from './icons.svg';

export interface IconProps {
  className?: string;
  icon: keyof typeof iconsType;
  height?: number,
  width?: number
}

const Icon = ({
  className, icon, width, height,
}: IconProps) => (
  <div className={cn(className, styles.icon, { [styles.close]: icon === iconsType.close })}>
<svg
  width={width} height={height}
className={styles.svg}
>
<use xlinkHref={`${icons}#${icon}`} />
</svg>
</div>
);

export default memo(Icon);
