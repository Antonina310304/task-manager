import React, { useCallback, useState } from 'react';

import { useSelector } from 'react-redux';
import ActionPanel from '../components/ActionPanel';
import Board from '../components/Board';
import {
  InitialTodosStateProps, RejectProps, ResolveProps, TaskDataExpanded,
} from '../types';
import usePromisifyComponent from '../hooks/usePromisifyComponent';
import TaskDetailModal from '../components/TaskDetailModal';
import newTask from '../static/newTask';
import ModalInfo from '../components/ModalInfo';

function Main() {
  const tasks = useSelector((state: InitialTodosStateProps) => state.tasks);
  const [activeTask, setActiveTask] = useState<TaskDataExpanded>(newTask());
  const [modalInfoData, setModalInfoData] = useState({ show: false, title: '' });

  const hideModal = useCallback(() => {
    setModalInfoData(((prevState) => ({ ...prevState, show: false })));
  }, []);

  const showModalInfo = useCallback((title) => {
    setModalInfoData({ title, show: true });
  }, []);

  const [modalTaskDetail, openModalTaskDetail] = usePromisifyComponent(
    (resolve: ResolveProps, reject: RejectProps, opened: boolean) => (
      <TaskDetailModal
        hideModal={reject}
        onShowModalInfo={showModalInfo}
        taskDataModal={{ isShow: opened, task: activeTask, type: 'change' }}
      />
    ),
    {},
    [activeTask],
  );

  const showTaskDetail = useCallback((taskId) => {
    const index = tasks.findIndex((i: TaskDataExpanded) => taskId === i.id);
    setActiveTask(tasks[index]);
    openModalTaskDetail();
  }, [tasks]);

  const createNewTask = useCallback(() => {
    setActiveTask(newTask);
    openModalTaskDetail();
  }, []);

  return (
    <div className="app">
      <ActionPanel
        onCreateNewTask={createNewTask}
        onShowModalInfo={showModalInfo}
      />
      <Board
        onShowTaskDetails={showTaskDetail}
        onShowModalInfo={showModalInfo}
      />
      {modalTaskDetail}

      <ModalInfo isShowModal={modalInfoData.show}
                 modalText={modalInfoData.title}
                 onHideModal={hideModal}/>
    </div>
  );
}

export default Main;
