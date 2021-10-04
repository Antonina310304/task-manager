import { useEffect, useState } from "react";
import { Keys } from "../types";
import ERRORS_ALERT from "../Utils/errors-alert";

/**
 * валидация поля
 * @param value значение инпута
 * @param validations правила валидации поля
 * @return error есть ли ошибки валидации у value
 * @return textError тестовое описание ошибки
 * */

const useValidation = (value: any, validations: any) => {
  const [isErrors, setErrors] = useState<Keys>({
    isEmpty: true,
    minLength: true,
  });

  const [textError, setTextError] = useState("");
  console.log(!value);
  useEffect(() => {
    Object.keys(validations).forEach((validation) => {
      switch (validation) {
        case "minLength":
          const isMinLength = value.length <= validations[validation];
          if (isMinLength) {
            setTextError(ERRORS_ALERT.minLength);
          }
          setErrors((prevState) => ({
            ...prevState,
            minLength: isMinLength,
          }));
          break;
        case "isEmpty":
          if (!value) {
            setTextError(ERRORS_ALERT.isEmpty);
          }
          setErrors((prevState) => ({ ...prevState, isEmpty: !value }));
          break;
      }
    });
  }, [validations, value]);

  return {
    error: Object.values(isErrors).some((error) => error),
    textError: textError,
  };
};

export default useValidation;
