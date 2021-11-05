import React, { memo } from 'react';
import Link from '../../primitives/Link';
import Modal from '../Modal';

interface ModalInfoProps {
  isShowModal: any;
  title: string;
  modalText: string;
  hideModal: any;
}

const ModalInfo = ({
  isShowModal, title, modalText, hideModal,
}: ModalInfoProps) => (
    <Modal isShowModal={isShowModal} hideModal={hideModal} title={title}>
      <>
        <p>{modalText}</p>
        <div>
          <Link type={'button'} onClick={hideModal} view={'primary'}>
            Огонь!
          </Link>
        </div>
      </>
    </Modal>
);

export default memo(ModalInfo);
