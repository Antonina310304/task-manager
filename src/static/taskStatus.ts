import { ITaskStatus } from '../types';

const taskStatus: Record<string, ITaskStatus> = {
  DONE: 'done',
  PROGRESS: 'progress',
  CREATED: 'created',
};

export default taskStatus;
