import React, { memo } from 'react';
import styles from "../../Board.module.css";

export interface BoardTitleProps {
    count: number;
}

const BoardTitle = ({count}: BoardTitleProps) => {

    return (
        <div className={styles.headerBlock}>
            <h1 className={styles.title}>{count ? 'Список задач' : 'У вас пока нет задач'}</h1>
            {(count > 0) &&
                <p className={styles.subtitle}>всего {count} задач</p>
            }
        </div>

    );
};

export default memo(BoardTitle);