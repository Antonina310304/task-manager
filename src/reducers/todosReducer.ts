import TodoAction from '../static/TodoAction';
import { InitialTodosStateProps, TaskActionTypes, TaskDataExpanded } from '../types';

const initialTodosState:InitialTodosStateProps = {
  tasks: [],
};

const todosReducer = (
  state: InitialTodosStateProps = initialTodosState,
  action: TaskActionTypes,
):InitialTodosStateProps => {
  switch (action.type) {
    case TodoAction.CHANGE:
      // eslint-disable-next-line no-case-declarations
      const index = state.tasks.findIndex((i: TaskDataExpanded) => i.id === action.payload.id);
      return {
        ...state,
        // @ts-ignore
        tasks: index === -1 ? [{ ...action.payload }, ...state.tasks]
          : [...state.tasks.slice(0, index), { ...action.payload },
            ...state.tasks.slice(index + 1)],
      };
    case TodoAction.REMOVE: {
      return {
        ...state,
        tasks: [...state.tasks.filter((i: TaskDataExpanded) => i.id !== action.payload.id)],
      };
    }
    default:
      return state;
  }
};

export default todosReducer;
