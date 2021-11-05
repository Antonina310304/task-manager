import React, {
  memo,
  useCallback,
  useMemo,
} from 'react';

import styles from './TaskDetail.module.css';

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

export interface TaskDetailProps {
  className?: string;
  taskDataModal: { task: TaskDataExpanded; type: string };
  removeTask: (arg: number) => void;
  hideModal?: () => void;
  changeTaskList: (data: TaskDataExpanded) => void;
}

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
              {currentField.type === 'select'
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
                    currentField.type === 'date'
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
          <Link type={'button'} disabled={disabledBtn} onClick={onSave} view={'primary'}>
            {isNewTask ? 'Создать' : 'Сохранить'}
          </Link>
        </div>

        {!isNewTask && (
          <div className={styles.buttonWrapper}>
            <div>
              <Link type={'button'} onClick={remove} view={'delete'}>
                Удалить
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TaskDetail);
