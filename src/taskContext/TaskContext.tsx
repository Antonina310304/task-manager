import React, {
  createContext, ReactElement, ReactNode, useCallback, useReducer,
} from 'react';
import { ActionType, TaskData, TaskDataExpanded } from '../types';
import taskList from '../store';

export const TaskListContext = createContext({});

/** т.к. состояние выделения задачи нужно только для интерфейса,
 * я добавляю нужные поля через функцию init */
function init(state: TaskData[]) {
  const newState = state.map((i: TaskData) => ({ ...i, checked: false }));
  return newState;
}

function reducer(state: TaskDataExpanded[], action: { type: ActionType, payload: any }) {
  if (action.type === 'checked') {
    return state.map((i: TaskDataExpanded) => ({ ...i, checked: action.payload }));
  } if (action.type === 'remove') {
    return state.filter((i: TaskDataExpanded) => i.id !== action.payload);
  } if (action.type === 'change') {
    const newState = [...state];
    const index = state.findIndex((i: TaskDataExpanded) => i.id === action.payload.id);
    if (index === -1) {
      newState.unshift(action.payload);
    } else {
      newState[index] = action.payload;
    }
    return newState;
  }
  throw new Error();
}

export interface TaskContextProps {
  children: ReactNode
}

export interface TaskContextPropsTest {
  ({ children }: TaskContextProps): ReactElement
}

const TaskContext: TaskContextPropsTest = (prop) => {
  const [tasks, dispatch] = useReducer(reducer, taskList, init);

  /** удаление задачи из state */
  const removeTask = useCallback((id: number) => {
    dispatch({ type: 'remove', payload: id });
  }, []);

  /** изменение задачи */
  const changeTask = useCallback((task: TaskDataExpanded) => {
    dispatch({ type: 'change', payload: task });
  }, []);

  return (
    <TaskListContext.Provider value={{
      removeTask, changeTask, tasks,
    }}>
      {prop.children}
    </TaskListContext.Provider>

  );
};

export default TaskContext;
