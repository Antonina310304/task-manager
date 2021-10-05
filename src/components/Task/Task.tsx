import React, { memo, useCallback, useContext } from 'react';
import cn from 'classnames';
import { TaskDataExpanded } from '../../types';
import Button from '../../primitives/Button';
import styles from './Task.module.css';
import { TaskListContext } from '../../taskContext/TaskContext';
import { ModalContext } from '../ModalProvider/ModalProvider';
import statusType from '../../static/statusType';

export interface TaskProps {
  taskData: TaskDataExpanded;
  showTaskDetails: (arg: number) => void;
}

const Task = ({
  taskData,
  showTaskDetails,
}: TaskProps) => {
  // @ts-ignore
  const { changeTask, removeTask } = useContext(TaskListContext);
  const { showModalInfo } = useContext(ModalContext);

  const remove = useCallback(() => {
    removeTask(taskData.id);
    showModalInfo(`Задача ${taskData.title} удалена`);
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
            <Button view="delete" onClick={remove}>
              удалить
            </Button>
          </div>
          <div className={styles.wrapperXs}>
            <Button view="change" onClick={() => showTaskDetails(taskData.id)}>
              изменить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Task);
