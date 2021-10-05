import { ValidationRulesType } from '../types';

/* правила валидации полей */
const validationRules: ValidationRulesType = {
  title: {
    minLength: 3,
    isEmpty: true,
  },

  text: {
    minLength: 3,
    isEmpty: true,
  },

  dateCreate: {
    minLength: 3,
    isEmpty: true,
  },
  status: {
    isEmpty: true,
  },
};

export default validationRules;
