import React, { memo, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container/Container';
import Link from '../primitives/Link';

interface PersonalProps extends RouteComponentProps {
  setAuth: (arg: (prevState: boolean) => boolean) => void;
}

const Personal = ({ setAuth, history }: PersonalProps) => {
  console.log(setAuth);
  const onClick = useCallback(() => {
    setAuth((prevState: boolean) => (!prevState));
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
