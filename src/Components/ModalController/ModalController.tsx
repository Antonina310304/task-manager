import React from "react";
import TaskDetailModal from "../TaskDetailModal/TaskDetailModal";
import Modal from "../Modal";
import TaskDetail from "../TaskDetail/TaskDetail";

interface ModalControllerProps {
  props: {
    show: boolean;
    type: string;
    data: object;
  };
}
const ModalController = ({ props }: ModalControllerProps) => {
  function render() {
    switch (props.type) {
      case "newTask":
        return <p>новая задача</p>;
        break;
      case "task":
        return (
          <TaskDetail
            // @ts-ignore
            taskDataModal={props.data}
            removeTask={() => {}}
            hideModal={() => {}}
            changeTaskList={() => {}}
          />
        );
        break;
      case "remove":
        return <p>удалила задачу</p>;
        break;
    }
  }
  return (
    <Modal
      isShowModal={props.show}
      hideModal={() => {}}
      title={"Создание задачи"}
    >
      {render()}
    </Modal>
  );
};

export default ModalController;
