import React, { useState } from "react";
import useValidation from "./useValidation";
import { TypesErrors } from "../types";

/**
 * хук состояние инпута
 * @param initialValue значение инпута
 * @param validationRules правила валидации поля
 * @return value текущее значение инпута
 * @return onChange функция для события onChange
 * @return onBlur функция для события onBlur
 * @return isBlur boolean инпут находится не в фокусе
 * @return isDirty первое изменение инпута
 * @return ...isValid error  boolean ошибки поля textError тестовое описание ошибки
 * */
const useInput = (initialValue: any, validationRules: TypesErrors) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  const isValid = useValidation(value, validationRules);

  const onChange = (value: React.SetStateAction<string>) => {
    setValue(value);
    setIsBlur(false);
    setIsDirty(true);
  };
  const onBlur = () => {
    setIsBlur(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isBlur,
    isDirty,
    ...isValid,
  };
};

export default useInput;
