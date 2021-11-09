import React, { ReactNode, useMemo } from 'react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';
import { TypeLink, TypeLinkData, ViewLink } from '../../types';
import styles from './Link.module.css';

interface LinkProp {
  href?: string;
  type: TypeLink;
  className?: string;
  view: ViewLink;
  onClick?: () => void;
  disabled?: boolean | null;
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
    [styles.change]: view === 'default',
    [styles.secondary]: view === 'secondary',
    [styles.delete]: view === 'delete',
    [styles.icon]: view === 'icon',
    [styles.nav]: view === 'nav',
  }), [view]);
  return (
    <>
      {type === TypeLinkData.nav && (
          <NavLink className={cn(styles.link,
            styleView,
            className,
            disabled && styles.disabledLink)}
                   exact
                   activeClassName={styles.active}
                   to={href || ''}>
            {children}
          </NavLink>

      )}
      {type === TypeLinkData.link && (
          <RouterLink className={cn(styles.link, styleView, className, disabled && styles.disabledLink)} to={href || ''}>
            {children}
          </RouterLink>
      )}
      {type === TypeLinkData.button && (
          <button
              disabled={!!disabled}
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
