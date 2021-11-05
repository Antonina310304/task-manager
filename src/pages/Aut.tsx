import React, { memo, useCallback } from 'react';
import Link from '../primitives/Link';
import Container from '../components/Container';

interface AutProps {
  setAuth: (arg: (prevState: boolean) => boolean) => void;
  route?: any
}

const Aut = ({ setAuth, route }: AutProps) => {
  const onClick = useCallback(() => {
    setAuth((prevState: boolean) => (!prevState));
    route.history.push('/');
  }, []);
  return (
        <Container>
            <p>Для просмотра задач необходимо авторизоваться!</p>
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
