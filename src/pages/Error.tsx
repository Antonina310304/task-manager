import React from 'react';
import Container from '../components/Container';
import Link from '../primitives/Link';

const Error = () => (
    <div>
        <Container>
            <p>404 Ошибка</p>
            <h1>Этой страницы не существует...</h1>
            <Link view={'secondary'} type={'link'} href={'/'}>
                Вернуться на главную
            </Link>
        </Container>

    </div>
);

export default Error;
