import React, { memo, useCallback } from 'react';
import cn from 'classnames';

import { useDispatch } from 'react-redux';
import { TaskDataExpanded, TaskStatusData } from '../../types';
import styles from './Task.module.css';
import statusType from '../../static/statusType';
import Link from '../../primitives/Link';
import { changeTask, deleteTask } from '../../store/tasksSlice';

export interface TaskProps {
  taskData: TaskDataExpanded;
  showTaskDetails: (arg: number) => void;
  onShowModalInfo: (arg: string) => void;
}

const Task = ({
  taskData,
  showTaskDetails,
  onShowModalInfo,
}: TaskProps) => {
  const dispatch = useDispatch();

  const remove = useCallback(() => {
    dispatch(deleteTask(taskData));
    onShowModalInfo(`Задача ${taskData.title} удалена`);
  }, [taskData.id]);

  const change = useCallback(() => {
    dispatch(changeTask({ ...taskData, checked: !taskData.checked }));
  }, [taskData]);

  return (
    <div className={cn(styles.task, { [styles.checked]: taskData.checked })}>
      <input
        className={styles.input}
        id={`task-${taskData.id}`}
        type="checkbox"
        checked={taskData.checked}
        onChange={change}
      />
      <label
        htmlFor={`task-${taskData.id}`}
        className={cn(styles.status, {
          [styles.done]: taskData.completed,
          [styles.progress]: !taskData.completed,
        })}
      >
        <p className={styles.statusName}>
          {statusType[taskData.completed as TaskStatusData]}
        </p>
      </label>
      <div className={styles.wrapper}>
        <div>
          <p className={styles.title}>{`${taskData.title} ${taskData.id}`}</p>
        </div>
        <div className={styles.buttonsWrapper}>
          <div className={styles.wrapperXs}>
            <Link view='primary' href={`/task/${taskData.id}`} type={'link'} onClick={() => showTaskDetails(taskData.id)}>
              подробнее
            </Link>
          </div>
          <div className={styles.wrapperXs}>
            <Link view="delete" onClick={remove} type={'button'}>
              удалить
            </Link>
          </div>
          <div className={styles.wrapperXs}>
            <Link view="default" onClick={() => showTaskDetails(taskData.id)} type={'button'}>
              изменить
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Task);
