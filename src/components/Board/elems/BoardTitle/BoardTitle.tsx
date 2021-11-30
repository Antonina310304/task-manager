import React, { memo } from 'react';
import styles from '../../Board.module.css';

export interface BoardTitleProps {
  count: number;
}

const title = {
  EMPTY: 'У вас пока нет задач',
  NOT_EMPTY: 'Список задач',
};

const BoardTitle = ({ count }: BoardTitleProps) => (
  <div className={styles.headerBlock}>
    <h1 className={styles.title}>{count ? title.NOT_EMPTY : title.EMPTY}</h1>
    {count > 0 && <p className={styles.subtitle}>всего {count} задач</p>}
  </div>
);

export default memo(BoardTitle);
