import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  TaskData,
  validatedFields,
  validationRules,
  displayFields,
} from "../../types";

import styles from "./TaskDetail.module.css";
import Input from "../../UI/Input/Input";
import Button from "../Button/Button";

import _debounce from "lodash.debounce";
import FormError from "../FormError";
import { statusType } from "../../Static/statusType";
import Select from "../../UI/Select";
import useInput from "../../Hooks/useInput";

export interface TaskDetailProps {
  className?: string;
  taskDataModal: { task: TaskData; type: string };
  removeTask: (arg: number) => void;
  hideModal: () => void;
  changeTaskList: (arg: TaskData) => void;
}

const TaskDetail = ({
  taskDataModal,
  removeTask,
  changeTaskList,
}: TaskDetailProps) => {
  const isNewTask = useMemo(() => {
    return taskDataModal.type === "create";
  }, [taskDataModal]);

  const DEBOUNCE_TIMEOUT = 150;
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const [taskStatus, setTaskStatus] = useState({
    status: taskDataModal.task.status,
    changedStatus: false,
  });

  const fields: any = {
    title: useInput(taskDataModal.task.title, validationRules.title),
    text: useInput(taskDataModal.task.text, validationRules.title),
    dateCreate: useInput(taskDataModal.task.dateCreate, validationRules.title),
  };

  const debounceRef = useRef<ReturnType<typeof _debounce>>();

  console.log("я перерисовался!");

  useEffect(() => {
    debounceRef.current = _debounce((target: any) => {
      const name: validatedFields = target.name;
      const value = target.value.trim();

      fields[name].onChange(value);
    }, DEBOUNCE_TIMEOUT);
  }, [fields]);

  const handlerInputChange = useCallback((event: any) => {
    if (!debounceRef.current) return;
    console.log(event.target.value);
    debounceRef.current(event.target);
  }, []);

  /** устанавливаю доступность кнопки сохранить/создать */
  useEffect(() => {
    const isCorrectField = Object.keys(fields).every((field: string) => {
      return !fields[field].error;
    });

    const isChanged = Object.keys(fields).some((field: string) => {
      return fields[field].isDirty;
    });

    setDisabledBtn(
      !(isCorrectField && (isChanged || taskStatus.changedStatus))
    );
  }, [fields, taskStatus]);

  const changeStatus = useCallback((value) => {
    setTaskStatus({ status: value, changedStatus: true });
  }, []);

  const remove = useCallback(() => {
    removeTask(taskDataModal.task.id);
  }, [removeTask, taskDataModal.task.id]);

  const onSave = useCallback(() => {
    changeTaskList({
      ...taskDataModal.task,
      title: fields.title.value,
      status: taskStatus.status,
      dateCreate: fields.dateCreate.value,
      text: fields.text.value,
    });
  }, [changeTaskList, taskDataModal.task, fields, taskStatus.status]);

  return (
    <div>
      {Object.keys(displayFields).map((field, index) => {
        if (displayFields[field as validatedFields].type === "select") {
          return (
            <div key={index} className={styles.inputWrapper}>
              <p className={styles.placeholder}>Статус:</p>
              <Select
                name={"status"}
                defaultValue={taskStatus.status}
                values={statusType}
                onChange={changeStatus}
              />
            </div>
          );
        } else {
          return (
            <div key={index} className={styles.inputWrapper}>
              <div className={styles.inputInner}>
                <p className={styles.placeholder}>
                  {displayFields[field as validatedFields].placeholder}
                </p>

                {fields[field].error && fields[field].isBlur && (
                  <FormError textError={fields[field].textError} />
                )}
              </div>
              <Input
                placeholder={
                  displayFields[field as validatedFields].placeholder
                }
                inputName={displayFields[field as validatedFields].inputName}
                type={displayFields[field as validatedFields].type}
                defaultValue={
                  displayFields[field as validatedFields].type === "date"
                    ? fields[field].value !== ""
                      ? new Date(fields[field].value)
                          .toISOString()
                          .split("T")[0]
                      : ""
                    : fields[field as validatedFields].value
                }
                onChange={handlerInputChange}
                onBlur={fields[field].onBlur}
              />
            </div>
          );
        }
      })}
      <div className={styles.buttonsGroup}>
        <div className={styles.buttonWrapper}>
          <Button disabled={disabledBtn} onClick={onSave} view={"change"}>
            {isNewTask ? "Создать" : "Сохранить"}
          </Button>
        </div>

        {!isNewTask && (
          <div className={styles.buttonWrapper}>
            <div>
              <Button onClick={remove} view={"delete"}>
                Удалить
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TaskDetail);
