import React, { memo, useCallback, useContext } from 'react';
import cn from 'classnames';

import { TaskDataExpanded } from '../../types';
import styles from './Task.module.css';
import { TaskListContext } from '../../taskContext/TaskContext';
import statusType from '../../static/statusType';
import Link from '../../primitives/Link';

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
  const { changeTask, removeTask } = useContext(TaskListContext);

  const remove = useCallback(() => {
    removeTask(taskData.id);
    onShowModalInfo(`Задача ${taskData.title} удалена`);
  }, [removeTask, taskData.id]);

  const change = useCallback(() => {
    changeTask({ ...taskData, checked: !taskData.checked });
  }, [changeTask, taskData]);

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
          [styles.create]: taskData.status === 'created',
          [styles.done]: taskData.status === 'done',
          [styles.progress]: taskData.status === 'progress',
        })}
      >
        <p className={styles.statusName}>{statusType[taskData.status]}</p>
      </label>
      <div className={styles.wrapper}>
        <div>
          <p className={styles.title}>{taskData.title}</p>
          <p className={styles.title}>{taskData.text}</p>
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
