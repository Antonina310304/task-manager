import { TaskStatusData } from '../types';

export type StatusTypeProps = Record<TaskStatusData, string>;

const statusType: StatusTypeProps = {
  done: 'Выполнено',
  progress: 'Выполняется',
  created: 'Создана',
};

export default statusType;
