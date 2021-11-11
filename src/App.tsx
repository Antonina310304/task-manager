import React, {
  createContext, useCallback, useEffect, useState,
} from 'react';
import './App.css';
import './theme.css';
import {
  BrowserRouter,
} from 'react-router-dom';
import Nav from './components/Nav';
import AppRouter from './components/AppRouter';

export const AuthContext = createContext<any>(null);

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('auth') === 'true') {
      setIsAuth(true);
    }
  }, []);

  const toggleAuth = useCallback((newState: boolean) => {
    setIsAuth(newState);
    localStorage.setItem('auth', String(newState));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, toggleAuth }}>
      <BrowserRouter>
        <Nav/>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
