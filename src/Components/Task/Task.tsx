import React, { memo } from "react";
import { TaskData, taskStatusData } from "../../types";
import Button from "../Button";
import styles from "./Task.module.css";
import cn from "classnames";

export interface TaskProps {
  taskData: TaskData;
  removeTask: (arg: number) => void;
  showTaskDetails: (arg: number) => void;
  changeTask: (arg: TaskData) => void;
}

const Task = ({
  taskData,
  removeTask,
  showTaskDetails,
  changeTask,
}: TaskProps) => {
  const statusType: Record<taskStatusData, string> = {
    done: "Выполнено",
    progress: "Выполняется",
    created: "Создана",
  };

  function remove() {
    removeTask(taskData.id);
  }

  function checkTask() {
    changeTask({ ...taskData, checked: !taskData.checked });
  }

  return (
    <div className={cn(styles.task, { [styles.checked]: taskData.checked })}>
      <input
        className={styles.input}
        id={`task-${taskData.id}`}
        type="checkbox"
        checked={taskData.checked}
        onChange={checkTask}
      />
      <label
        htmlFor={`task-${taskData.id}`}
        className={cn(styles.status, {
          [styles.create]: taskData.status === "created",
          [styles.done]: taskData.status === "done",
          [styles.progress]: taskData.status === "progress",
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
