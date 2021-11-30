import React, { memo, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Modal.module.css';
import './animation-styles.css';

import Icon from '../../primitives/Icon';

import Link from '../../primitives/Link';
import viewBtn from '../../static/ViewBtn';
import typeLink from '../../static/typeLink';

export interface ModalType {
  className?: string;
  title?: string;
  children?: ReactNode;
  isShowModal: boolean;
  hideModal: () => void;
}

const TIMEOUT = 350;
const TYPE_ICON = 'close';

const Modal = ({
  isShowModal, hideModal, title, children,
}: ModalType) => (
  <div>
    <CSSTransition
      onClick={hideModal}
      in={isShowModal}
      unmountOnExit
      timeout={TIMEOUT}
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
        <Link type={typeLink.button}
              view={viewBtn.icon}
              onClick={hideModal}
              className={styles.close}>
          <Icon icon={TYPE_ICON}/>
        </Link>
        {title && <p className={styles.title}>{title}</p>}
        {children}
      </div>
    </CSSTransition>
  </div>
);

export default memo(Modal);
