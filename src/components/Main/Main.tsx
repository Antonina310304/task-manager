import React, { useCallback, useContext, useState } from 'react';

import ActionPanel from '../ActionPanel';
import Board from '../Board';
import { TaskListContext } from '../../taskContext/TaskContext';
import { RejectProps, ResolveProps, TaskDataExpanded } from '../../types';
import usePromisifyComponent from '../../hooks/usePromisifyComponent';
import TaskDetailModal from '../TaskDetailModal/TaskDetailModal';
import newTask from '../../static/newTask';

function Main() {
  // @ts-ignore
  const { tasks } = useContext(TaskListContext);
  const [activeTask, setActiveTask] = useState<TaskDataExpanded>(tasks[0]);

  const [modalTaskDetail, openModalTaskDetail] = usePromisifyComponent(
    (resolve: ResolveProps, reject: RejectProps, opened: boolean) => (
      <TaskDetailModal
        hideModal={reject}
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
        createNewTask={createNewTask}
      />
      <Board
        showTaskDetails={showTaskDetail}
      />
        {modalTaskDetail}
    </div>
  );
}

export default Main;
