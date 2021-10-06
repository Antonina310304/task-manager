import React, { memo, useContext } from 'react';
import Task from '../Task';
import styles from './Board.module.css';
import BoardTitle from './elems/BoardTitle';
import Container from '../Container';
import { TaskListContext } from '../../taskContext/TaskContext';
import { TaskDataExpanded } from '../../types';

export interface TaskListProps {
  onShowTaskDetails: (arg: number) => void;
  onShowModalInfo: (arg: string) => void;
}

const Board = ({ onShowModalInfo, onShowTaskDetails }: TaskListProps) => {
  const { tasks } = useContext(TaskListContext);
  return (
    <div className={styles.board}>
      <BoardTitle count={tasks.length} />
      <Container>
        {tasks.map((item: TaskDataExpanded) => (
          <div className={styles.boardItem} key={item.id}>
            <Task
              showTaskDetails={onShowTaskDetails}
              onShowModalInfo={onShowModalInfo}
              taskData={item}
            />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default memo(Board);
