import React, { memo, useCallback, useContext } from 'react';
import Modal from '../Modal';
import TaskDetail from '../TaskDetail';

import { TaskListContext } from '../../taskContext/TaskContext';
import { TaskDataExpanded } from '../../types';
import { ModalContext } from '../ModalProvider/ModalProvider';

interface TaskDetailModalProps {
  taskDataModal: { isShow: boolean, task: TaskDataExpanded, type: string };
  hideModal: () => void;
}

const TaskDetailModal = ({
  hideModal,
  taskDataModal,
}: TaskDetailModalProps) => {
  // @ts-ignore
  const { removeTask, changeTask } = useContext(TaskListContext);
  const { showModalInfo } = useContext(ModalContext);

  const change = useCallback((task) => {
    changeTask(task);
    hideModal();
    showModalInfo(`Задача «${task.title}» успешно сохранена`);
  }, [taskDataModal]);

  const remove = useCallback((id) => {
    removeTask(id);
    hideModal();
    showModalInfo(`Задача «${taskDataModal.task.title}» успешно удалена`);
  }, [taskDataModal]);

  return (
    <Modal
      isShowModal={taskDataModal.isShow}
      hideModal={hideModal}
      title={taskDataModal.type === 'create' ? 'Создание задачи' : 'Изменение задачи'}
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
