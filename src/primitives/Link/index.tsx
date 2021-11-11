import React, { ReactNode, useMemo } from 'react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';
import { TypeLink, ViewLink } from '../../types';
import styles from './Link.module.css';
import typeLink from '../../static/typeLink';
import viewBtn from '../../static/ViewBtn';

interface LinkProp {
  href?: string;
  type: TypeLink;
  className?: string;
  view: ViewLink;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
}

const Link = ({
  href = '/',
  type,
  className,
  view,
  onClick,
  disabled,
  children,
}: LinkProp) => {
  const styleView = useMemo(() => ({
    [styles.change]: view === viewBtn.default,
    [styles.secondary]: view === viewBtn.secondary,
    [styles.delete]: view === viewBtn.delete,
    [styles.icon]: view === viewBtn.icon,
    [styles.nav]: view === viewBtn.nav,
  }), [view]);

  return (
    <>
      {type === typeLink.nav && (
        <NavLink className={cn(styles.link, styleView, className)}
                 exact
                 activeClassName={styles.active}
                 to={href || ''}>
          {children}
        </NavLink>

      )}
      {type === typeLink.link && (
        <RouterLink className={cn(styles.link, styleView, className)} to={href || ''}>
          {children}
        </RouterLink>
      )}
      {type === typeLink.button && (
        <button
          disabled={disabled}
          className={cn(styles.link, className, styleView)}
          onClick={() => {
            if (onClick) {
              onClick();
            }
          }}
        >
          {children}
        </button>

      )}
    </>
  );
};

export default Link;
