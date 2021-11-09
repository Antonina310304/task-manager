import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './theme.css';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from './store/tasksSlice';

import TaskPage from './pages/TaskPage';
import Aut from './pages/Aut';
import Description from './pages/Description';
import Personal from './pages/Personal';
import Main from './pages/Main';
import Error from './pages/Error';
import Nav from './components/Nav';
import { LinkProps } from './types';
import ANY from './static/any';

function App() {
  const [isAuth, setAuth] = useState(false);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const { error, status } = useSelector((state: any) => state.tasks);
  const WithAut = (props: any) => <Aut {...props} setAuth={setAuth}/>;
  const WithPersonal = (props: any) => <Personal {...props} setAuth={setAuth}/>;
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchTodos());
  }, [dispatch]);

  const links: LinkProps[] = useMemo(() => (
    [
      {
        href: '/', title: 'Главная', autAccess: true, path: '/', nav: true, component: Main, exact: true,
      },
      {
        href: 'error', title: '404 ошибка', autAccess: ANY, path: '/error', nav: false, component: Error, exact: false,
      },
      {
        href: 'task', title: 'Детальная задачи', autAccess: true, path: '/task/:id', nav: false, component: TaskPage, exact: true,
      },
      {
        href: '/', title: 'Описание', autAccess: false, path: '/', nav: true, component: Description, exact: true,
      },
      {
        href: '/aut', title: 'Авторизация', autAccess: false, path: '/aut', nav: false, component: WithAut, exact: false,
      },
      {
        href: '/personal', title: 'Личный кабинет', autAccess: true, path: '/personal', nav: true, component: WithPersonal, exact: false,
      },
    ]
  ), []);

  return (
    <BrowserRouter>
      <Nav links={links.filter((item: any) => item.nav)}
           isAuth={isAuth}
           setAuth={setAuth}
           error={error}
      />
      {
        <Switch>
          {links.filter((item: any) => item.autAccess === isAuth
            || item.autAccess === ANY)
            .map((item: any) => (
              <Route key={item.path} path={item.path}
                     component={item.component} exact={item.exact}/>
            ))}
          <Redirect to='/error' exact/>
        </Switch>
      }
    </BrowserRouter>
  );
}

export default App;
