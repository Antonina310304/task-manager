import React, { memo, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Link from '../primitives/Link';
import Container from '../components/Container';
import pathPages from '../static/pathPages';
import { AuthContext } from '../App';

const Aut = () => {
  const history = useHistory();
  const { toggleAuth } = useContext(AuthContext);
  const onClick = useCallback(() => {
    toggleAuth(true);
    history.push(`/${pathPages.description}`);
  }, []);

  console.log(onClick);

  return (
        <Container>
            <p>Аторизуйстесь, чтобы получить доступ к задачам!</p>
            <Link type={'button'}
                  view={'default'}
                  // onClick={onClick}
            >
                Авторизоваться
            </Link>
        </Container>
  );
};

export default memo(Aut);
