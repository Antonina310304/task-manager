import React, { useMemo, useState } from 'react';
import './App.css';
import './theme.css';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ANY from './static/any';
import Main from './pages/Main';
import Error from './pages/Error';
import Nav from './components/Nav';
import TaskPage from './pages/TaskPage';
import Aut from './pages/Aut';
import Description from './pages/Description';
import Personal from './pages/Personal';
import { LinkProps } from './types';

import rootReducer from './reducers/todosReducer';

// eslint-disable-next-line no-underscore-dangle
const store = createStore(rootReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__
// eslint-disable-next-line no-underscore-dangle
  && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  const [isAuth, setAuth] = useState(false);

  const WithAut = (props: any) => <Aut {...props} setAuth={setAuth}/>;
  const WithPersonal = (props: any) => <Personal {...props} setAuth={setAuth}/>;

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
    <Provider store={store}>
      <BrowserRouter>
        <Nav links={links.filter((item: any) => item.nav)}
             isAuth={isAuth}
             setAuth={setAuth}/>
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
    </Provider>
  );
}

export default App;
