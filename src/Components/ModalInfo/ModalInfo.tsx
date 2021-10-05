import React, { memo } from 'react';
import Modal from '../Modal';
import Button from '../../primitives/Button';

export interface ModalInfoProps {
  isShowModal: boolean;
  modalText: string;
  hideModal: () => void;
}

const ModalInfo = ({
  isShowModal, modalText, hideModal,
}: ModalInfoProps) => (

    <Modal isShowModal={isShowModal} hideModal={hideModal} title={'Изменения применены'}>
      <>
        <p>{modalText}</p>
        <div>
          <Button onClick={hideModal} view={'change'}>
            Огонь!
          </Button>
        </div>
      </>
    </Modal>
);

export default memo(ModalInfo);
