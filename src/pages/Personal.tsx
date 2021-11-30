import React, { memo, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../AuthContext/AuthContext';
import Container from '../components/Container/Container';
import Link from '../primitives/Link';
import pathPages from '../static/pathPages';

const EXIT = 'Выйти';
const TITLE = 'Это персональная страница пользователя';

const Personal = () => {
  const history = useHistory();
  const { toggleAuth } = useContext(AuthContext);

  const onClick = useCallback(() => {
    toggleAuth(false);
    history.push(pathPages.description);
  }, []);
  return (
    <div>
      <Container>
        <h1>{TITLE}</h1>
        <p>
          <Link type={'button'} onClick={onClick} view={'default'}>{EXIT}</Link>
        </p>
      </Container>
    </div>
  );
};

export default memo(Personal);
