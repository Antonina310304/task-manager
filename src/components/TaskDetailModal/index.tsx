import React, { memo, useCallback, useContext } from 'react';
import Modal from '../Modal';
import TaskDetail from '../TaskDetail';

import { TaskListContext } from '../../taskContext/TaskContext';
import { TaskDataExpanded } from '../../types';

interface TaskDetailModalProps {
  taskDataModal: { isShow: boolean, task: TaskDataExpanded, type: string };
  hideModal: () => void;
  onShowModalInfo: (arg: string) => void;
}

const btnTitle = {
  CREATE: 'Создание задачи',
  CHANGE: 'Изменение задачи',
};
const CREATE_TYPE = 'create';

const TaskDetailModal = ({
  hideModal,
  taskDataModal,
  onShowModalInfo,
}: TaskDetailModalProps) => {
  const { removeTask, changeTask } = useContext(TaskListContext);

  const change = useCallback((task) => {
    changeTask(task);
    hideModal();
    onShowModalInfo(`Задача «${task.title}» успешно сохранена`);
  }, [taskDataModal]);

  const remove = useCallback((id) => {
    removeTask(id);
    hideModal();
    onShowModalInfo(`Задача «${taskDataModal.task.title}» успешно удалена`);
  }, [taskDataModal]);

  return (
    <Modal
      isShowModal={taskDataModal.isShow}
      hideModal={hideModal}
      title={taskDataModal.type === CREATE_TYPE ? btnTitle.CREATE : btnTitle.CHANGE}
    >
      <TaskDetail
        taskDataModal={{ task: taskDataModal.task, type: taskDataModal.type }}
        removeTask={remove}
        hideModal={hideModal}
        changeTaskList={change}
      />
    </Modal>
  );
};

export default memo(TaskDetailModal);
