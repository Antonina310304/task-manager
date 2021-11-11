import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LinkProps } from '../../types';
import Main from '../../pages/Main';
import ANY from '../../static/any';
import Error from '../../pages/Error';
import TaskPage from '../../pages/TaskPage';
import Description from '../../pages/Description';
import Aut from '../../pages/Aut';
import Personal from '../../pages/Personal';
import TaskContext from '../../taskContext/TaskContext';
import pathPages from '../../static/pathPages';
import AuthContext from '../../AuthContext/AuthContext';

const links: LinkProps[] = [
  {
    autAccess: true,
    path: pathPages.main,
    component: Main,
    exact: true,
  },
  {
    autAccess: ANY,
    path: pathPages.error,
    component: Error,
    exact: false,
  },
  {
    autAccess: true,
    path: pathPages.tasks,
    component: TaskPage,
    exact: true,
  },
  {
    autAccess: false,
    path: pathPages.description,
    component: Description,
    exact: true,
  },
  {
    autAccess: false,
    path: pathPages.aut,
    component: Aut,
    exact: false,
  },
  {
    autAccess: true,
    path: pathPages.personal,
    component: Personal,
    exact: false,
  },
];

const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    <TaskContext>
      <Switch>
        {links.filter((item: any) => item.autAccess === isAuth
          || item.autAccess === ANY)
          .map((item: any) => (
            <Route key={item.path} path={`/${item.path}`}
                   component={item.component} exact={item.exact}/>
          ))}
         {isAuth && (<Redirect to={`/${pathPages.error}`} exact/>)}
         {!isAuth && (<Redirect to={`/${pathPages.aut}`} exact/>)}
      </Switch>
    </TaskContext>
  );
};

export default AppRouter;
