import React, { useCallback, useEffect, useState } from "react";

import Board from "../Board";
import { TaskData } from "../../types";
import declOfNum from "../../Utils/declOfNum";
import ActionPanel from "../ActionPanel";

import TaskDetailModal from "../TaskDetailModal";
import ModalInfo from "../ModalInfo";

export interface MainProps {
  tasks: any[];
  removeTask: (arg: number) => void;
  change: (arg: any) => void;
  selectAllTasks: (arg: boolean) => void;
}

function Main({ tasks, removeTask, change, selectAllTasks }: MainProps) {
  //TODO когда передаешь в state без as TaskData выдается ошибка

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowModalChange, setIsShowModalChange] = useState<boolean>(false);
  const [modalText, setModalText] = useState("Задача изменена");

  const [isEnabledRemove, setIsEnabledRemove] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState({
    selected: false,
    disabled: false,
  });

  /** для замены контента в компоненте детальной задачи */
  const [taskDataModal, setTaskDataModal] = useState({
    task: tasks[0],
    type: "create",
  });

  /** открытие модалки успешного изменения */
  const showModalChange = useCallback((title) => {
    setModalText(title);
    setIsShowModalChange(true);
  }, []);

  /** закрытие модалки успешного изменения таска */
  const closeSuccessModal = useCallback(() => {
    setIsShowModalChange(false);
  }, [setIsShowModalChange]);

  const removeTaskBoard = useCallback(
    (id) => {
      removeTask(id);
      showModalChange("Задача удалена");
    },
    [removeTask, showModalChange]
  );

  /** удаление выделенных задач */
  const removeSelectedTask = useCallback(() => {
    const titles = ["задача", "задачи", "задач"];
    tasks.forEach((task: TaskData) => {
      if (task.checked) {
        removeTask(task.id);
      }
    });

    //считаю количество задач на удаление
    const countTasksToRemove = tasks.filter(
      (item: TaskData) => item.checked
    ).length;

    /** меняю текст в зависимости от количества задач на удаление*/
    const titleModal =
      countTasksToRemove === tasks.length
        ? "Все задачи удалены"
        : `Удалено ${countTasksToRemove} ${declOfNum(
            countTasksToRemove,
            titles
          )}`;
    showModalChange(titleModal);
  }, [tasks, showModalChange, removeTask]);

  /**
   * при изменении таска проверяю меняю состояние кнопок "выделить все и удалить выделенное"
   * */
  useEffect(() => {
    let isSomeChecked: boolean = false,
      isEveryChecked: boolean = true;
    tasks.forEach((task: TaskData) => {
      isSomeChecked = isSomeChecked || task.checked;
      isEveryChecked = isEveryChecked && task.checked;
    });
    setIsEnabledRemove(isSomeChecked);
    setIsSelected({ disabled: false, selected: isEveryChecked });
    if (!tasks.length) {
      setIsSelected({ disabled: true, selected: false });
    }
  }, [tasks]);

  /** изменение задачи после нажатия кнопки сохранить */
  const changeTask = useCallback(
    (task: TaskData) => {
      change(task);
      setIsShowModal(false);
      showModalChange(`Задача «${task.title}» успешно сохранена`);
    },
    [change, showModalChange]
  );

  /** функция закрытия модального окна */
  const hideModal = useCallback(() => {
    setIsShowModal(false);
  }, []);

  /** click на кнопку удалить в детальной задачи */
  const removeTaskInModal = useCallback(
    (id: number) => {
      removeTask(id);
      hideModal();
      showModalChange(`Задача удалена`);
    },
    [hideModal, removeTask, showModalChange]
  );

  /** открытие детальной таска */
  const showTaskDetails = useCallback(
    (id: number) => {
      const index = tasks.findIndex((i: any) => i.id === id);
      setTaskDataModal({ task: tasks[index], type: "change" });
      setIsShowModal(true);
    },
    [tasks]
  );

  return (
    <div className="app">
      <ActionPanel
        setIsShowModal={setIsShowModal}
        setTaskDataModal={setTaskDataModal}
        selectAllTasks={selectAllTasks}
        removeSelectedTask={removeSelectedTask}
        isEnabledRemove={isEnabledRemove}
        isSelected={isSelected}
      />

      <Board
        taskList={tasks}
        showTaskDetails={showTaskDetails}
        changeTask={change}
        removeTask={removeTaskBoard}
      />

      {/** рендер будет происходить только при смене isShowModal/isShowModalChange на true */}
      <TaskDetailModal
        isShowModal={isShowModal}
        hideModal={hideModal}
        task={taskDataModal}
        removeTask={removeTaskInModal}
        changeTask={changeTask}
      />
      <ModalInfo
        isShowModal={isShowModalChange}
        hideModal={closeSuccessModal}
        title="Изменения сохранены"
        modalText={modalText}
      />
    </div>
  );
}

export default Main;
