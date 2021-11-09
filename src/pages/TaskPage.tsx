import React, { useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TaskDetail from '../components/TaskDetail';
import Container from '../components/Container';
import { changeTaskData, deleteTask } from '../store/tasksSlice';
import StateType from '../static/StateType';

type RouteParams = {
  id: string
};

const TaskPage = ({ match, history }: RouteComponentProps<RouteParams>) => {
  const dispatch = useDispatch();
  const taskId = Number(match.params.id);
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const task = tasks.find((t: any) => t.id === taskId);

  const change = useCallback((changedTask) => {
    dispatch(changeTaskData(changedTask));
    history.push('/');
  }, []);

  const remove = useCallback(() => {
    dispatch(deleteTask(tasks));
    history.push('/');
  }, []);

  return (
    <Container>
      {!task && (
        <p>Сожалею, но такой задачи не существует!</p>
      )}
      {task && (
        <>
          <p>{task.title}</p>
          <TaskDetail
            taskDataModal={{ task, type: StateType.CHANGE }}
            removeTask={remove}
            changeTaskList={change}
          />
        </>
      )}

      </Container>
  );
};

export default TaskPage;
