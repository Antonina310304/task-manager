import React, {
  memo,
  useCallback,
  useMemo,
} from 'react';

import { TaskDataExpanded, ValidatedFields } from '../../types';
import displayFields from '../../static/displayFields';
import statusType from '../../static/statusType';
import Select from '../../primitives/Select';
import Alert from '../../primitives/Alert';
import Input from '../../primitives/Input';
import useForm from '../../hooks/useForm';
import validationRules from '../../static/validationRules';
import transformDate from '../../utils/transformDate';
import Link from '../../primitives/Link';
import styles from './TaskDetail.module.css';
import viewBtn from '../../static/ViewBtn';
import typeLink from '../../static/typeLink';

export interface TaskDetailProps {
  className?: string;
  taskDataModal: { task: TaskDataExpanded; type: string };
  removeTask: (arg: number) => void;
  hideModal?: () => void;
  changeTaskList: (data: TaskDataExpanded) => void;
}

const SELECT = 'select';
const DATE = 'date';

const btnName = {
  CREATE: 'Создать',
  SAVE: 'Сохранить',
  REMOVE: 'Удалить',
};

const TaskDetail = ({
  taskDataModal,
  removeTask,
  changeTaskList,
}: TaskDetailProps) => {
  const isNewTask = useMemo(() => taskDataModal.type === 'create', [taskDataModal]);

  const [disabledBtn, fields, handlerInputChange] = useForm(taskDataModal.task, validationRules);

  const remove = useCallback(() => {
    removeTask(taskDataModal.task.id);
  }, [removeTask, taskDataModal.task.id]);

  const onSave = useCallback(() => {
    changeTaskList({
      ...taskDataModal.task,
      title: fields.title.value,
      status: fields.status.value,
      dateCreate: fields.dateCreate.value,
      text: fields.text.value,
    });
  }, [changeTaskList, taskDataModal.task, fields]);

  return (
    <div>
      {Object.keys(displayFields).map((field, index) => {
        const currentField = displayFields[field as ValidatedFields];
        return (
          (
            <div key={index} className={styles.inputWrapper}>
              <div className={styles.inputInner}>
                <p className={styles.placeholder}>
                  {currentField.placeholder}
                </p>
                {fields[field].error && fields[field].isBlur && (
                  <Alert textError={fields[field].textError} />
                )}
              </div>
              {currentField.type === SELECT
                ? <Select
                  name={'status'}
                  defaultValue={fields.status.value}
                  values={statusType}
                  onChange={handlerInputChange}
                />
                : <Input
                  placeholder={
                    currentField.placeholder
                  }
                  inputName={currentField.inputName}
                  type={currentField.type}
                  defaultValue={
                    currentField.type === DATE
                      ? transformDate(fields[field as ValidatedFields].value)
                      : fields[field as ValidatedFields].value
                  }
                  onChange={handlerInputChange}
                  onBlur={fields[field].onBlur}
                />
              }
            </div>
          )
        );
      })}
      <div className={styles.buttonsGroup}>
        <div className={styles.buttonWrapper}>
          <Link type={typeLink.button}
                disabled={disabledBtn}
                onClick={onSave}
                view={viewBtn.primary}>
            {isNewTask ? btnName.CREATE : btnName.SAVE}
          </Link>
        </div>

        {!isNewTask && (
          <div className={styles.buttonWrapper}>
            <div>
              <Link type={typeLink.button} onClick={remove} view={viewBtn.delete}>
                {btnName.REMOVE}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TaskDetail);
