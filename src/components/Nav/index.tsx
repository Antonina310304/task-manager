import React, { useCallback, useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AuthContext } from '../../App';
import Link from '../../primitives/Link';
import pathPages from '../../static/pathPages';
import { TypeLinkData } from '../../types';
import Container from '../Container';
import styles from './Nav.module.css';

const links: any = [
  { href: 'tasks', title: 'Задачи', autAccess: true },
  { href: pathPages.personal, title: 'Личный кабинет', autAccess: true },
  { href: pathPages.description, title: 'Описание', autAccess: false },
  { href: pathPages.aut, title: 'Авторизация', autAccess: false },
];

const Nav = ({ history }: RouteComponentProps) => {
  const { isAuth, toggleAuth } = useContext(AuthContext);

  console.log(pathPages);
  const onClick = useCallback(() => {
    toggleAuth(!isAuth);
    history.push(`${pathPages.main}`);
  }, [isAuth]);

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.links}>
          {links
            .filter((item: any) => item.autAccess === isAuth)
            .map((item: any, idx: number) => {
              console.log(history.location.pathname.indexOf(item.href));
              console.log(item.href, history.location.pathname);
              return (
                <Link
                  className={
                    history.location.pathname.indexOf(item.href) !== -1 ? styles.active : ''
                  }
                  key={idx}
                  view={'nav'}
                  type={TypeLinkData.nav}
                  href={item.href}
                >
                  {item.title}
                </Link>
              );
            })}
          <Link
            className={'styles.link'}
            view={'nav'}
            type={TypeLinkData.button}
            onClick={onClick}
          >
            {isAuth ? 'Выйти' : 'Войти'}
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default withRouter(Nav);
