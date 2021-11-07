// eslint-disable-next-line import/no-cycle
import { ActionType } from '../types';

const TodoAction: Record<string, ActionType> = {
  CHANGE: 'change',
  REMOVE: 'remove',
  CHECKED: 'checked',
};

export default TodoAction;
