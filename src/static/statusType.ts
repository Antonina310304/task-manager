import { ITaskStatus } from '../types';

export type StatusTypeProps = Record<ITaskStatus, string>;

const statusType: StatusTypeProps = {
  done: 'Выполнено',
  progress: 'Выполняется',
  created: 'Создана',
};

export default statusType;
