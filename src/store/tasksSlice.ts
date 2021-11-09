import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTasks',
  async (f: any, { rejectWithValue }: any) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTask = createAsyncThunk(
  'todos/deleteTasks',
  // eslint-disable-next-line consistent-return
  async (task:any, { rejectWithValue, dispatch }: any) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Can\'t delete task. Server error');
      }
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(removeTask(task));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const changeTaskData = createAsyncThunk(
  'todos/deleteTasks',
  // eslint-disable-next-line consistent-return
  async (task:any, { rejectWithValue, dispatch }: any) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task,
        }),
      });
      if (!response.ok) {
        throw new Error('Can\'t change task. Server error');
      }
      const data = await response.json();
      console.log(data);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(changeTask(task));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const addTask = createAsyncThunk(
  'todos/deleteTasks',
  // eslint-disable-next-line consistent-return
  async (task:any, { rejectWithValue, dispatch }: any) => {
    console.log(task);
    try {
      const ttask = {
        title: task.title,
        userId: 1,
        completed: task.completed,
      };
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ttask),
      });
      if (!response.ok) {
        throw new Error('Can\'t add task. Server error');
      }

      const data = await response.json();
      console.log(data);
      // sdfsdf
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(changeTask({ ...data, id: task.id }));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const setError = (state: any, action: any) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: null,
    error: null,
  },
  reducers: {
    changeTask(state: any, action: any) {
      const index = state.tasks.findIndex((i: any) => i.id === action.payload.id);
      if (index === -1) {
        state.tasks.unshift(action.payload);
      } else {
        state.tasks[index] = action.payload;
      }
    },
    removeTask(state: any, action: any) {
      state.tasks = state.tasks.filter((i: any) => i.id !== action.payload.id);
    },
  },
  extraReducers: {
    // @ts-ignore
    [fetchTodos.pending]: (state: any) => {
      state.status = 'loading';
      state.error = null;
    },
    // @ts-ignore
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.tasks = action.payload;
    },
    // @ts-ignore
    [fetchTodos.rejected]: setError,
    // @ts-ignore
    [deleteTask.rejected]: setError,
    // @ts-ignore
    [changeTaskData.rejected]: setError,
  },
});

export const { changeTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
