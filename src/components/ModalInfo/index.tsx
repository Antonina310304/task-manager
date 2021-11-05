import React, { memo } from 'react';
import Modal from '../Modal';
import Link from '../../primitives/Link';

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
<Link type={'button'} onClick={onHideModal} view={'primary'}>
  Огонь!
  </Link>
  </div>
  </>
  </Modal>
);

export default memo(ModalInfo);
