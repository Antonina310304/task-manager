/* список отображаемых полей */
import { DisplayFieldsType } from '../types';

const displayFields: DisplayFieldsType = {
  title: {
    placeholder: 'Название задачи',
    inputName: 'title',
    type: 'text',
  },
  text: {
    placeholder: 'Описание задачи',
    inputName: 'text',
    type: 'text',
  },
  dateCreate: {
    placeholder: 'Дата создания задачи',
    inputName: 'dateCreate',
    type: 'date',
  },
  status: {
    placeholder: 'Статус',
    inputName: 'status',
    type: 'select',
  },
};

export default displayFields;
