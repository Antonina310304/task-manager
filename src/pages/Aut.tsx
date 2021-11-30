import React, { memo, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Link from '../primitives/Link';
import Container from '../components/Container';
import pathPages from '../static/pathPages';
import AuthContext from '../AuthContext/AuthContext';
import View from '../static/ViewBtn';
import typeLink from '../static/typeLink';

const TITLE = 'Аторизуйстесь, чтобы получить доступ к задачам!';
const AUTH = 'Авторизоваться';

const Aut = () => {
  const history = useHistory();
  const { toggleAuth } = useContext(AuthContext);
  const onClick = useCallback(() => {
    toggleAuth(true);
    history.push(pathPages.main);
  }, []);

  return (
    <Container>
      <p>{TITLE}</p>
      <Link type={typeLink.button}
            view={View.default}
            onClick={onClick}
      >
        {AUTH}
      </Link>
    </Container>
  );
};

export default memo(Aut);
