import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import _debounce from 'lodash.debounce';
import useInput from './useInput';
import { TaskDataExpanded, ValidatedFields, ValidationRulesType } from '../types';

const useForm = (task: TaskDataExpanded, validationRules: ValidationRulesType) => {
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const DEBOUNCE_TIMEOUT = 150;

  const fields = Object.keys(validationRules).reduce((acc: any, item: string) => {
    acc[item] = useInput(task[item as ValidatedFields], validationRules[item as ValidatedFields]);
    return acc;
  }, {});

  const debounceRef = useRef<ReturnType<typeof _debounce>>();
  useEffect(() => {
    debounceRef.current = _debounce((evt: any) => {
      const { name } = evt.target;
      const value = evt.target.value.trim();

      fields[name].onChange(value);
    }, DEBOUNCE_TIMEOUT);
  }, [fields]);

  const handlerInputChange = useCallback((event: any) => {
    if (!debounceRef.current) return;
    debounceRef.current(event);
  }, []);

  /** устанавливаю доступность кнопки сохранить/создать */
  useEffect(() => {
    const isCorrectField = Object.keys(fields).every((field: string) => !fields[field].error);
    const isChanged = Object.keys(fields).some((field: string) => fields[field].isDirty);

    setDisabledBtn(!(isCorrectField && isChanged));
  }, [fields]);

  return [disabledBtn,
    fields, handlerInputChange];
};

export default useForm;
