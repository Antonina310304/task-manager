import React, { memo, useCallback } from 'react';
import Modal from '../Modal';
import TaskDetail from '../TaskDetail';

import { TaskDataExpanded } from '../../types';
import StateType from '../../static/StateType';

interface TaskDetailModalProps {
  taskDataModal: { isShow: boolean, task: TaskDataExpanded, type: string };
  hideModal: () => void;
  onShowModalInfo: (arg: string) => void;
}

const modalTitle = {
  CREATE: 'Создание задачи',
  CHANGE: 'Изменение задачи',
};

const TaskDetailModal = ({
  hideModal,
  taskDataModal,
  onShowModalInfo,
}: TaskDetailModalProps) => {
  const change = useCallback((task) => {
    hideModal();
    onShowModalInfo(`Задача «${task.title}» успешно сохранена`);
  }, [taskDataModal]);

  const remove = useCallback(() => {
    hideModal();
    onShowModalInfo(`Задача «${taskDataModal.task.title}» успешно удалена`);
  }, [taskDataModal]);

  return (
    <Modal
      isShowModal={taskDataModal.isShow}
      hideModal={hideModal}
      title={taskDataModal.type === StateType.CREATE ? modalTitle.CREATE : modalTitle.CHANGE}
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
