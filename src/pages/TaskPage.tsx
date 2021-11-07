import React, { useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TaskDetail from '../components/TaskDetail';
import Container from '../components/Container';
import { removeTask } from '../actions/todosActions';
import StateType from '../static/StateType';

type RouteParams = {
  id: string
};

const TaskPage = ({ match, history }: RouteComponentProps<RouteParams>) => {
  const dispatch = useDispatch();
  const taskId = Number(match.params.id);
  const tasks = useSelector((state: any) => state.tasks);
  const task = tasks.find((t: any) => t.id === taskId);

  const change = useCallback(() => {
    history.push('/');
  }, []);

  const remove = useCallback(() => {
    dispatch(removeTask(task.task.id));
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
