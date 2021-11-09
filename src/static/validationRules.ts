import { ValidationRulesType } from '../types';

/* правила валидации полей */
const validationRules: ValidationRulesType = {
  title: {
    minLength: 3,
    isEmpty: true,
  },
  completed: {
    isEmpty: true,
  },
};

export default validationRules;
