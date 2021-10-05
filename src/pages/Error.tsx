import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

const Error = () => (
    <div>
      <Container>
        <h1>Этой страницы не существует...</h1>
        <Link to={'/'}>
          Вернуться на главную
        </Link>
      </Container>

    </div>
);

export default Error;
