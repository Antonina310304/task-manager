import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../Modal';
import TaskDetail from '../TaskDetail';

import { TaskDataExpanded } from '../../types';
import StateType from '../../static/StateType';
import { addTask, changeTaskData, deleteTask } from '../../store/tasksSlice';

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
  const dispatch = useDispatch();

  const change = useCallback((task) => {
    onShowModalInfo(`Задача «${task.title}» успешно сохранена`);
    if (taskDataModal.type === StateType.CREATE) {
      dispatch(addTask(task));
      return;
    }
    dispatch(changeTaskData(task));
    hideModal();
  }, [taskDataModal]);

  const remove = useCallback(() => {
    hideModal();
    dispatch(deleteTask(taskDataModal.task));
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
