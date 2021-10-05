import { TaskDataExpanded } from '../types';

const newTask = () => ({
  id: Date.now(),
  title: '',
  text: '',
  dateCreate: new Date(),
  status: 'created',
  checked: false,
} as TaskDataExpanded);

export default newTask;
