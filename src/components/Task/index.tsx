import React, { memo, useCallback, useContext } from 'react';
import cn from 'classnames';

import { TaskDataExpanded } from '../../types';
import styles from './Task.module.css';
import { TaskListContext } from '../../taskContext/TaskContext';
import statusType from '../../static/statusType';
import Link from '../../primitives/Link';
import typeLink from '../../static/typeLink';
import viewBtn from '../../static/ViewBtn';
import taskStatus from '../../static/taskStatus';

export interface TaskProps {
  taskData: TaskDataExpanded;
  showTaskDetails: (arg: number) => void;
  onShowModalInfo: (arg: string) => void;
}
const btnText = {
  CNANGE: 'Изменить',
  REMOVE: 'Удалить',
  DETAIL: 'Подробнее',
};

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
          [styles.create]: taskData.status === taskStatus.CREATED,
          [styles.done]: taskData.status === taskStatus.DONE,
          [styles.progress]: taskData.status === taskStatus.PROGRESS,
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
            <Link view={viewBtn.primary}
                  href={`/tasks/${taskData.id}`}
                  type={typeLink.link}
                  onClick={() => showTaskDetails(taskData.id)}>
              {btnText.DETAIL}
            </Link>
          </div>
          <div className={styles.wrapperXs}>
            <Link view={viewBtn.delete} onClick={remove} type={typeLink.button}>
              {btnText.REMOVE}
            </Link>
          </div>
          <div className={styles.wrapperXs}>
            <Link view={viewBtn.default}
                  onClick={() => showTaskDetails(taskData.id)}
                  type={typeLink.button}>
              {btnText.CNANGE}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Task);
