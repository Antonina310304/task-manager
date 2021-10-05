import { TypesErrors } from '../types';

const ERRORS_ALERT: Record<keyof TypesErrors, string> = {
  minLength: 'Меньше минимальной длины',
  isEmpty: 'Поле не должно быть пустым',
};

export default ERRORS_ALERT;
