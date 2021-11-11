import React, { useCallback, useState } from 'react';
import './App.css';
import './theme.css';
import {
  BrowserRouter,
} from 'react-router-dom';
import Nav from './components/Nav';
import AppRouter from './components/AppRouter';
import AuthContext from './AuthContext/AuthContext';

const AUTH = 'auth';
const userIsAut = () => localStorage.getItem('auth') === 'true';

const App = () => {
  const [isAuth, setIsAuth] = useState(userIsAut());

  const toggleAuth = useCallback((newState: boolean) => {
    setIsAuth(newState);
    localStorage.setItem(AUTH, String(newState));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, toggleAuth }}>
      <BrowserRouter>
        <Nav/>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
