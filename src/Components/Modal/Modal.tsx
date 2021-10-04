import React, { memo, ReactNode } from "react";
import styles from "./Modal.module.css";
import ButtonClose from "../../UI/ButtonClose";
import { CSSTransition } from "react-transition-group";

import "./styles.css";

export interface ModalType {
  className?: string;
  title?: string;
  children?: ReactNode;
  isShowModal: boolean;
  hideModal: () => void;
}

const Modal = ({ isShowModal, hideModal, title, children }: ModalType) => {
  return (
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
        onClick={(e: any) => e.stopPropagation()}
      >
        <div className={styles.inner}>
          <ButtonClose onClick={hideModal} className={styles.close} />
          {title && <p className={styles.title}>{title}</p>}
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

export default memo(Modal);
