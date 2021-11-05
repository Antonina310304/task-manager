import React, { memo, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Modal.module.css';
import './animation-styles.css';

import Icon from '../../primitives/Icon';

import Link from '../../primitives/Link';

export interface ModalType {
  className?: string;
  title?: string;
  children?: ReactNode;
  isShowModal: boolean;
  hideModal: () => void;
}

const Modal = ({
  isShowModal, hideModal, title, children,
}: ModalType) => (
  <div>
    <CSSTransition
      onClick={hideModal}
      in={isShowModal}
      unmountOnExit
      timeout={350}
      classNames="modal"
    >
      <div className={styles.wrapper}></div>
    </CSSTransition>

    <CSSTransition
      in={isShowModal}
      timeout={350}
      classNames="inner"
      unmountOnExit
      onClick={(event: React.FormEvent) => event.stopPropagation()}
    >
      <div className={styles.inner}>
        <Link type={'button'} view={'icon'} onClick={hideModal} className={styles.close}>
          <Icon icon={'close'}/>
        </Link>
        {title && <p className={styles.title}>{title}</p>}
        {children}
      </div>
    </CSSTransition>
  </div>
);

export default memo(Modal);
