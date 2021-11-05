import React, { useState } from 'react';
import './App.css';
import './theme.css';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';

import TaskContext from './taskContext/TaskContext';
import Main from './pages/Main';
import Error from './pages/Error';
import { LinkProps } from './types';
import Nav from './components/Nav';
import TaskPage from './pages/TaskPage';
import Aut from './pages/Aut';

const links: LinkProps[] = [
  { href: '/', title: 'Главная' },
  { href: '/error', title: 'Ошибка' },
];

function App() {
  const [isAuth, setAuth] = useState(false);

  return (
        <TaskContext>
            <BrowserRouter>
                <Nav links={links} isAuth={isAuth} setAuth={setAuth}/>
                {isAuth && (
                    <Switch>
                        <Route path='/' component={Main} exact/>
                        <Route path='/error' component={Error}/>
                        <Route path='/task/:id' component={TaskPage} exact/>
                        <Redirect to='/error'/>
                    </Switch>
                )}
                {!isAuth && (
                    <Switch>
                        <Route path='/aut' exact
                               render={(props) => (<Aut route={props} setAuth={setAuth}/>)}/>
                        <Redirect to='/aut'/>
                    </Switch>

                )}
            </BrowserRouter>
        </TaskContext>
  );
}

export default App;
