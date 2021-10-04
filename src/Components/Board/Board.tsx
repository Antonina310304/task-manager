import React, { memo } from "react";
import { TaskData } from "../../types";
import Task from "../Task";
import styles from "./Board.module.css";
import BoardTitle from "./elems/BoardTitle";
import Container from "../Container";

export interface taskListData {
  taskList: TaskData[];
  removeTask: (arg: number) => void;
  showTaskDetails: (arg: number) => void;
  changeTask: (arg: TaskData) => void;
}

const Board = ({
  taskList,
  removeTask,
  showTaskDetails,
  changeTask,
}: taskListData) => {
  return (
    <div className={styles.board}>
      <BoardTitle count={taskList.length} />
      <Container>
        {taskList.map((item) => {
          return (
            <div className={styles.boardItem} key={item.id}>
              <Task
                showTaskDetails={showTaskDetails}
                removeTask={removeTask}
                changeTask={changeTask}
                taskData={item}
              />
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default memo(Board);
