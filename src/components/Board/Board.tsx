import React, { memo, useContext } from 'react';
import Task from '../Task';
import styles from './Board.module.css';
import BoardTitle from './elems/BoardTitle';
import Container from '../Container';
// @ts-ignore
import { TaskListContext } from '../../taskContext/TaskContext.tsx';
import { TaskDataExpanded } from '../../types';

export interface TaskListProps {
  showTaskDetails: (arg: number) => void;
}

const Board = ({
  showTaskDetails,
}: TaskListProps) => {
  const { tasks } = useContext(TaskListContext);
  return (
    <div className={styles.board}>
      <BoardTitle count={tasks.length} />
      <Container>
        {tasks.map((item: TaskDataExpanded) => (
          <div className={styles.boardItem} key={item.id}>
            <Task
              showTaskDetails={showTaskDetails}
              taskData={item}
            />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default memo(Board);
