/* список отображаемых полей */
import { DisplayFieldsType } from '../types';

const displayFields: DisplayFieldsType = {
  title: {
    placeholder: 'Название задачи',
    inputName: 'title',
    type: 'text',
  },
  completed: {
    placeholder: 'Статус',
    inputName: 'completed',
    type: 'select',
  },
};

export default displayFields;
