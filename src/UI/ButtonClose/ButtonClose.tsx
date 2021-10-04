import React, {memo, ReactNode} from 'react';


import styles from './ButtonClose.module.css'
import cn from "classnames";

export interface ButtonCloseType {
    className?: string;
    children?: ReactNode;
    onClick?: () => void;
}


const ButtonClose = ({className, onClick, children}: ButtonCloseType) => {
    return (
        <button onClick={onClick} className={cn(className, styles.button)} type='button'>
            {children}
        </button>
    );
};

export default memo(ButtonClose);