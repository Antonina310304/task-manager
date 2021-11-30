import React, { memo } from 'react';
import Modal from '../Modal';
import Link from '../../primitives/Link';
import viewBtn from '../../static/ViewBtn';
import typeLink from '../../static/typeLink';

export interface ModalInfoProps {
  isShowModal: boolean;
  modalText: string;
  onHideModal: () => void;
}

const TITLE = 'Изменения применены';
const TEXT_BTN = 'Огонь!';

const ModalInfo = ({
  isShowModal, modalText, onHideModal,
}: ModalInfoProps) => (

  <Modal isShowModal={isShowModal} hideModal={onHideModal} title={TITLE}>
    <>
      <p>{modalText}</p>
      <div>
        <Link type={typeLink.button} onClick={onHideModal} view={viewBtn.primary}>
          {TEXT_BTN}
        </Link>
      </div>
    </>
  </Modal>
);

export default memo(ModalInfo);
