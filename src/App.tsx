import React from 'react';
import './App.css';
import './theme.css';
import Main from './components/Main';

import TaskContext from './taskContext/TaskContext';
import ModalProvider from './components/ModalProvider/ModalProvider';

function App() {
  return (
    <ModalProvider>
      <TaskContext>
        <Main/>
      </TaskContext>
    </ModalProvider>
  );
}

export default App;
