import React from 'react';
import Container from '../components/Container/Container';
import Link from '../primitives/Link';

const Description = () => (
        <div>
            <Container>
                <h1>Это страница с описанием приложения</h1>
                <p>Для перехода на детаную страницу нажать &quot;Подробнее&quot;</p>
                <p>Для открытия модалки с детальной информацией нажать &quot;Изменить&quot;</p>
                <p>Для удаления задачи нажать &quot;Удалить&quot;</p>
                <p>Также удалить задачу можно из детальной страницы задачи</p>

                <h3>чтобы посмотреть все страницы необходимо авторизоваться</h3>
                <p>
                    <Link type={'link'} href="/aut" view={'default'}>авторизоваться</Link>
                </p>

            </Container>

        </div>
);

export default Description;
