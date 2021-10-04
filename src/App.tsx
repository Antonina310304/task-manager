import React, { useCallback, useEffect, useReducer } from "react";
import "./App.css";
import Main from "./Components/Main";
import { taskList } from "./data";

/** т.к. состояние выделения задачи нужно только для интерфейса,
 * я добавляю нужные поля через функцию init*/
function init(state: any) {
  const newState = state.map((i: any) => {
    i.checked = false;
    return i;
  });
  return newState;
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case "checked":
      const checked = [...state];
      checked.forEach((item) => (item.checked = action.payload));
      return checked;
    case "remove":
      return state.filter((i: any) => i.id !== action.payload);
    case "change":
      const newState = [...state];
      const index = state.findIndex((i: any) => i.id === action.payload.id);
      if (index === -1) {
        newState.unshift(action.payload);
      } else {
        newState[index] = action.payload;
      }
      return newState;
    default:
      throw new Error();
  }
}

function App() {
  const [tasks, dispatch] = useReducer(reducer, taskList, init);

  useEffect(() => {
    console.log("tasks");
  }, []);

  /** удаление задачи из state */
  const removeTask = useCallback((id: number) => {
    dispatch({ type: "remove", payload: id });
  }, []);

  /** изменение задачи */
  const changeTask = useCallback((task: any) => {
    dispatch({ type: "change", payload: task });
  }, []);

  /** выделение всех задач */
  const selectAllTasks = useCallback(
    (isChecked) => {
      tasks.forEach((task: any) => {
        task.checked = isChecked;
        dispatch({ type: "change", payload: task });
      });
    },
    [tasks]
  );

  return (
    <Main
      tasks={tasks}
      selectAllTasks={selectAllTasks}
      change={changeTask}
      removeTask={removeTask}
    />
  );
}

export default App;
