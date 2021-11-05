import React, {
  memo, useCallback, useContext, useEffect, useState,
} from 'react';
import { TaskDataExpanded } from '../../types';
import Container from '../Container';
import styles from './ActionPanel.module.css';
import declOfNum from '../../utils/declOfNum';
import { TaskListContext } from '../../taskContext/TaskContext';
import Link from '../../primitives/Link';

export interface HeaderProps {
  onCreateNewTask: () => void;
  onShowModalInfo: (data: string) => void;
}

const ActionPanel = ({ onCreateNewTask, onShowModalInfo }: HeaderProps) => {
  const {
    tasks, changeTask, removeTask,
  } = useContext(TaskListContext);

  const [isEnabledRemove, setIsEnabledRemove] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState({
    selected: false,
    disabled: false,
  });

  /** выделить все задачи */
  const toggleSelectionTasks = useCallback(() => {
    tasks.forEach((task: TaskDataExpanded) => {
      changeTask({ ...task, checked: !isSelected.selected });
    });
  }, [isSelected]);

  /** удаление выделенных задач */
  const removeSelectedTask = useCallback(() => {
    const titles = ['задача', 'задачи', 'задач'];
    tasks.forEach((task: TaskDataExpanded) => {
      if (task.checked) {
        removeTask(task.id);
      }
    });

    // считаю количество задач на удаление
    const countTasksToRemove = tasks.filter(
      (item: TaskDataExpanded) => item.checked,
    ).length;

    /** меняю текст в зависимости от количества задач на удаление */
    const titleModal = countTasksToRemove === tasks.length
      ? 'Все задачи удалены'
      : `Удалено ${countTasksToRemove} ${declOfNum(
        countTasksToRemove,
        titles,
      )}`;

    onShowModalInfo(titleModal);
  }, [tasks, removeTask]);

  /**
   * при изменении таска проверяю меняю состояние кнопок "выделить все и удалить выделенное"
   * */
  useEffect(() => {
    let isSomeChecked: boolean | undefined = false;
    let isEveryChecked: false | undefined | boolean = true;

    tasks.forEach((task: TaskDataExpanded) => {
      isSomeChecked = isSomeChecked || task.checked;
      isEveryChecked = isEveryChecked && task.checked;
    });
    setIsEnabledRemove(isSomeChecked);
    setIsSelected({ disabled: false, selected: isEveryChecked });
    if (!tasks.length) {
      setIsSelected({ disabled: true, selected: false });
    }
  }, [tasks]);

  return (
    <Container className={styles.panel}>
      <div className={styles.wrapper}>
        <Link type={'button'} className={styles.button} view="primary" onClick={onCreateNewTask}>
          создать задачу
        </Link>
        <Link
          type={'button'}
          className={styles.button}
          onClick={toggleSelectionTasks}
          view="default"
          disabled={isSelected.disabled}
        >
          {isSelected.selected ? 'снять выделение' : 'выделить все'}
        </Link>
        <Link
          type={'button'}
          className={styles.button}
          view="delete"
          disabled={!isEnabledRemove}
          onClick={removeSelectedTask}
        >
          Удалить выделенное
        </Link>
      </div>
    </Container>
  );
};

export default memo(ActionPanel);
