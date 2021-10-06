import React from 'react';
import './App.css';
import './theme.css';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import TaskContext from './taskContext/TaskContext';
import Main from './pages/Main';
import Error from './pages/Error';

function App() {
  return (
    <TaskContext>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/error' component={Error}/>
        <Redirect to='/error'/>
      </Switch>
    </BrowserRouter>
    </TaskContext>

  );
}

export default App;
