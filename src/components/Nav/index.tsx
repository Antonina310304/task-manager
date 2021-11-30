import React, { useCallback, useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AuthContext from '../../AuthContext/AuthContext';
import Link from '../../primitives/Link';
import pathPages from '../../static/pathPages';
import viewBtn from '../../static/ViewBtn';
import Container from '../Container';
import styles from './Nav.module.css';
import typeLink from '../../static/typeLink';

const links: any = [
  { href: pathPages.main, title: 'Задачи', autAccess: true },
  { href: pathPages.personal, title: 'Личный кабинет', autAccess: true },
  { href: pathPages.description, title: 'Описание', autAccess: false },
  { href: pathPages.aut, title: 'Авторизация', autAccess: false },
];
const ENTER = 'Войти';
const EXIT = 'Выйти';

const Nav = ({ history }: RouteComponentProps) => {
  const { isAuth, toggleAuth } = useContext(AuthContext);

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
            .map((item: any, idx: number) => (
                <Link
                  className={
                    history.location.pathname.indexOf(item.href) !== -1 ? styles.active : ''
                  }
                  key={idx}
                  view={viewBtn.nav}
                  type={typeLink.nav}
                  href={`/${item.href}`}
                >
                  {item.title}
                </Link>
            ))}
          <Link
            className={styles.link}
            view={viewBtn.nav}
            type={typeLink.button}
            onClick={onClick}
          >
            {isAuth ? EXIT : ENTER}
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default withRouter(Nav);
