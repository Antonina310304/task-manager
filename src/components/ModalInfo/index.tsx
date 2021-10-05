import React, { memo } from 'react';
import Modal from '../Modal';
import Button from '../../primitives/Button';

export interface ModalInfoProps {
  isShowModal: boolean;
  modalText: string;
  onHideModal: () => void;
}

const ModalInfo = ({
  isShowModal, modalText, onHideModal,
}: ModalInfoProps) => (

  <Modal isShowModal={isShowModal} hideModal={onHideModal} title={'Изменения применены'}>
<>
  <p>{modalText}</p>
<div>
<Button onClick={onHideModal} view={'change'}>
  Огонь!
  </Button>
  </div>
  </>
  </Modal>
);

export default memo(ModalInfo);
