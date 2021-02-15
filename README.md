# Movies-explorer-api

## API сервиса поиска фильмов
https://api.a-z.movies-explorer.students.nomoredomains.monster/
https://www.api.a-z.movies-explorer.students.nomoredomains.monster/

### Запуск проекта
npm run start — запускает сервер
npm run dev — запускает сервер с hot-reload

### Auth
POST /signup - создание пользователя с переданными данными: name, email, password
POST /signin - проверяет переданные email и password и возвращает JWT-token

### User
GET /users/me - возвращает информацию о пользователе (name и email)
PATCH /users/me - обновляет данные пользователя (name и email)

### Movies
GET /movies - возвращает сохраненные пользователем фильмы
POST /movies - создаёт фильм с переданными данными: country, director, duration, year, description, image, trailer, movieId, nameRU, nameEN и thumbnail
DELETE /movies/movieId - удаляет сохранённый фильм по ID

### Технологии
Данный проект был реализован на Node.js, Express.js и MongoDB согласно технологии Rest API
Выполнен деплой: создана ВМ, настроен nginx и выпущены SSL-сертификаты
