import React, { useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Link from '../../primitives/Link';
import { LinkProps, TypeLinkData } from '../../types';
import Container from '../Container';
import styles from './Nav.module.css';

interface NavProp extends RouteComponentProps{
  links: LinkProps[];
  isAuth: boolean;
  setAuth: (arg: (prevState: boolean) => boolean) => void;
}

const Nav = ({
  links, isAuth, setAuth,
  history,
}: NavProp) => {
  const onClick = useCallback(() => {
    setAuth((prevState: boolean) => (!prevState));
    history.push('/');
  }, [isAuth]);

  return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.links}>
                    {links.map((item, idx) => (
                        <Link className={'styles.link'} view={'nav'} type={TypeLinkData.nav} key={idx} href={item.href}>
                            {item.title}
                        </Link>
                    ))}
                    <Link className={'styles.link'} view={'nav'} type={TypeLinkData.button} onClick={onClick}>
                        {isAuth ? 'Выйти' : 'Войти'}
                    </Link>

                </div>
            </Container>
        </div>
  );
};

export default withRouter(Nav);