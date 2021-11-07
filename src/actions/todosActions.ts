import TodoAction from '../static/TodoAction';
import { TaskActionTypes, TaskDataExpanded } from '../types';

export const changeTask = (tasks: TaskDataExpanded):TaskActionTypes => ({
  type: TodoAction.CHANGE,
  payload: tasks,
});

export const removeTask = (id: number):TaskActionTypes => ({
  type: TodoAction.REMOVE,
  payload: { id },
});
