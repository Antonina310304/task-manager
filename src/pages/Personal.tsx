import React, { memo, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '../components/Container/Container';
import Link from '../primitives/Link';
import { AuthContext } from '../App';

const Personal = () => {
  const history = useHistory();
  const { toggleAuth } = useContext(AuthContext);

  const onClick = useCallback(() => {
    toggleAuth(false);
    history.push('/');
  }, []);
  return (
    <div>
        <Container>
            <h1>Это персональная страница пользователя</h1>
            <p>
                <Link type={'button'} onClick={onClick} view={'default'}>выйти</Link>
            </p>

        </Container>

    </div>
  );
};

export default memo(Personal);
