import React, { memo } from "react";
import Modal from "../Modal/Modal";
import Button from "../../primitives/Button/Button";

const ModalInfo = ({ isShowModal, title, modalText, hideModal }) => {
  return (
    <Modal isShowModal={isShowModal} hideModal={hideModal} title={title}>
      <>
        <p>{modalText}</p>
        <div>
          <Button onClick={hideModal} view={"change"}>
            Огонь!
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default memo(ModalInfo);
