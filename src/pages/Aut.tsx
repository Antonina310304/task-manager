import React, { memo, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Link from '../primitives/Link';
import Container from '../components/Container';

interface AutProps extends RouteComponentProps {
  setAuth: (arg: (prevState: boolean) => boolean) => void;
}

const Aut = ({ setAuth, history }: AutProps) => {
  const onClick = useCallback(() => {
    setAuth((prevState: boolean) => (!prevState));
    history.push('/');
  }, []);
  return (
        <Container>
            <p>Аторизуйстесь, чтобы получить доступ к задачам!</p>
            <Link type={'button'}
                  view={'default'}
                  onClick={onClick}
            >
                Авторизоваться
            </Link>
        </Container>
  );
};

export default memo(Aut);
