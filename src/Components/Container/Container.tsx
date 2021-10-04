import React, { ReactNode, memo } from 'react';

import styles from './Container.module.css';
import cn from "classnames";

interface IContainer {
    className?: string;
    children: ReactNode;
}

const Container = ({className, children}: IContainer) => {
    return (
        <div className={cn(styles.container, className)}>
            {children}
        </div>
    );
};

export default memo(Container);