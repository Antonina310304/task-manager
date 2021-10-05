import { useEffect, useState } from 'react';
import { Keys } from '../types';
// eslint-disable-next-line import/extensions
import ERRORS_ALERT from '../utils/errors-alert';

/**
 * валидация поля
 * @param value значение инпута
 * @param validations правила валидации поля
 * @return error есть ли ошибки валидации у value
 * @return textError тестовое описание ошибки
 * */

const useValidation = (value: any, validations: any) => {
  const [isErrors, setErrors] = useState<Keys>({
    isEmpty: false,
    minLength: false,
  });

  const [textError, setTextError] = useState('');
  useEffect(() => {
    Object.keys(validations).forEach((validation) => {
      switch (validation) {
        case 'minLength':
        // eslint-disable-next-line no-case-declarations
          const isMinLength = value.length <= validations[validation];
          if (isMinLength) {
            setTextError(ERRORS_ALERT.minLength);
          }
          setErrors((prevState) => ({
            ...prevState,
            minLength: isMinLength,
          }));
          break;
        case 'isEmpty':
          if (!value) {
            setTextError(ERRORS_ALERT.isEmpty);
          }
          setErrors((prevState) => ({ ...prevState, isEmpty: !value }));
          break;
        default:
          break;
      }
    });
  }, [validations, value]);
  return {
    error: Object.values(isErrors).some((error) => error),
    textError,
  };
};

export default useValidation;
