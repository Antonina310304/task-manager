import React, { memo, useCallback } from "react";

import Button from "../Button";
import Container from "../Container";
import styles from "./ActionPanel.module.css";
import { TaskData } from "../../types";

export interface HeaderType {
  selectAllTasks: (arg: boolean) => void;
  removeSelectedTask?: () => void;
  isEnabledRemove: boolean;
  setIsShowModal: (arg: boolean) => void;
  setTaskDataModal: any;
  isSelected: { selected: boolean; disabled: boolean };
}

const ActionPanel = ({
  selectAllTasks,
  removeSelectedTask,
  isEnabledRemove,
  isSelected,
  setTaskDataModal,
  setIsShowModal,
}: HeaderType) => {
  /** выделить все задачи */
  const handlerClick = useCallback(() => {
    selectAllTasks(!isSelected.selected);
  }, [isSelected, selectAllTasks]);

  const newTask = useCallback(() => {
    const task: TaskData = {
      id: Date.now(),
      title: "",
      text: "",
      dateCreate: new Date(),
      status: "created",
      checked: false,
    };
    return task;
  }, []);

  const createNewTask = useCallback(() => {
    setTaskDataModal({ task: newTask(), type: "create" });
    setIsShowModal(true);
  }, [newTask, setIsShowModal, setTaskDataModal]);

  return (
    <Container className={styles.panel}>
      <div className={styles.wrapper}>
        <Button className={styles.button} view="change" onClick={createNewTask}>
          создать задачу
        </Button>
        <Button
          className={styles.button}
          onClick={handlerClick}
          view="change"
          disabled={isSelected.disabled}
        >
          {isSelected.selected ? "снять выделение" : "выделить все"}
        </Button>
        <Button
          className={styles.button}
          view="delete"
          disabled={!isEnabledRemove}
          onClick={removeSelectedTask}
        >
          Удалить выделенное
        </Button>
      </div>
    </Container>
  );
};

export default memo(ActionPanel);
