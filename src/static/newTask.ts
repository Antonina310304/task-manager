import { TaskDataExpanded } from '../types';

const newTask = () => ({
  id: Date.now(),
  title: '',
  text: '',
  dateCreate: new Date().toISOString(),
  checked: false,
  completed: 'false',
} as TaskDataExpanded);

export default newTask;
