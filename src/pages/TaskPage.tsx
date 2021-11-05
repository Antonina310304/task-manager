import React, { useCallback, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import TaskDetail from '../components/TaskDetail';
import Container from '../components/Container';
import { TaskListContext } from '../taskContext/TaskContext';

type RouteParams = {
  id: string
};

const TaskPage = ({ match, history }: RouteComponentProps<RouteParams>) => {
  const taskId = Number(match.params.id);
  const { tasks, removeTask, changeTask } = useContext(TaskListContext);
  const changedTask = tasks.find((task) => task.id === taskId);

  const change = useCallback((task) => {
    changeTask(task);
    history.push('/');
  }, []);

  const remove = useCallback((id) => {
    removeTask(id);
    history.push('/');
  }, []);

  return (
      <Container>
        {!changedTask && (
            <p>Сожалею, но такой задачи не существует!</p>
        )}
        {changedTask && (
            <>
                <p>{changedTask.title}</p>
                <TaskDetail
                    taskDataModal={{ task: changedTask, type: 'change' }}
                    removeTask={remove}
                    changeTaskList={change}
                />
            </>
        )}

      </Container>
  );
};

export default TaskPage;
