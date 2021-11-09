import { TaskStatusData } from '../types';

export type StatusTypeProps = Record<TaskStatusData, string>;

const statusType: StatusTypeProps = {
  true: 'Выполнено',
  false: 'Выполняется',
};

export default statusType;
