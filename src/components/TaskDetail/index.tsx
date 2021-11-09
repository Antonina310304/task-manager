import React, {
  memo,
  useCallback,
  useMemo,
} from 'react';
import { TaskDataExpanded, TaskStatusData, ValidatedFields } from '../../types';
import displayFields from '../../static/displayFields';
import statusType from '../../static/statusType';
import Select from '../../primitives/Select';
import Alert from '../../primitives/Alert';
import Input from '../../primitives/Input';
import useForm from '../../hooks/useForm';
import validationRules from '../../static/validationRules';
import Link from '../../primitives/Link';
import styles from './TaskDetail.module.css';

export interface TaskDetailProps {
  className?: string;
  taskDataModal: { task: TaskDataExpanded; type: string };
  removeTask: (arg: any) => void;
  hideModal?: () => void;
  changeTaskList: (arg?: any) => void;
}

const TaskDetail = ({
  taskDataModal,
  removeTask,
  changeTaskList,
}: TaskDetailProps) => {
  const isNewTask = useMemo(() => taskDataModal.type === 'create', [taskDataModal]);
  const [disabledBtn, fields, handlerInputChange] = useForm(taskDataModal.task, validationRules);

  const remove = useCallback(() => {
    removeTask(taskDataModal.task);
  }, [removeTask, taskDataModal.task.id]);

  const onSave = useCallback(() => {
    const task = {
      ...taskDataModal.task,
      title: fields.title.value,
      completed: fields.completed.value,
    };
    changeTaskList(task);
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
                  name={'completed'}
                  defaultValue={statusType[fields.completed as TaskStatusData]}
                  values={statusType}
                  onChange={handlerInputChange}
                />
                : <Input
                  placeholder={
                    currentField.placeholder
                  }
                  inputName={currentField.inputName}
                  type={currentField.type}
                  defaultValue={fields[field as ValidatedFields].value}
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
