import React, { memo } from 'react';
import cn from 'classnames';
import styles from './Alert.module.css';

export interface FormErrorProps {
  className?: string;
  textError?: string;
}

const Alert = ({ className, textError }: FormErrorProps) => (
  <div className={cn(className, styles.wrapper)}>
<p className={styles.error}>
  {textError || 'Заполните поле корректно!'}
</p>
</div>
);

export default memo(Alert);
