import React, { memo } from "react";
import Modal from "../Modal/Modal";
import TaskDetail from "../TaskDetail";

interface TaskDetailModalProps {
  task: any;
  isShowModal: any;
  hideModal: any;
  removeTask: any;
  changeTask: any;
}
const TaskDetailModal = ({
  task,
  isShowModal,
  hideModal,
  removeTask,
  changeTask,
}: TaskDetailModalProps) => {
  return (
    <Modal
      isShowModal={isShowModal}
      hideModal={hideModal}
      title={task.type === "create" ? "Создание задачи" : "Изменение задачи"}
    >
      <TaskDetail
        taskDataModal={task}
        removeTask={removeTask}
        hideModal={hideModal}
        changeTaskList={changeTask}
      />
    </Modal>
  );
};

export default memo(TaskDetailModal);
