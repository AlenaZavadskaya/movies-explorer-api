# Movies-explorer-api :tv:

## [API сервиса поиска фильмов](https://alena.movies.students.nomoredomains.monster/)

### :computer: Установка и запуск проекта
> `git clone https://github.com/AlenaZavadskaya/movies-explorer-api.git` - клонирует репозиторий<br/>
> `npm install` - устанавливает зависимости<br/>
> `npm run start` — запускает сервер<br/>
> `npm run dev` — запускает сервер с hot-reload

### :key: Auth
- POST /signup - создание пользователя с переданными данными: name, email, password
- POST /signin - проверяет переданные email и password и возвращает JWT-token

### :man: User
- GET /users/me - возвращает информацию о пользователе (name и email)
- PATCH /users/me - обновляет данные пользователя (name и email)

### :video_camera: Movies
- GET /movies - возвращает сохраненные пользователем фильмы
- POST /movies - создаёт фильм с переданными данными: country, director, duration, year, description, image, trailer, movieId, nameRU, nameEN и thumbnail
- DELETE /movies/movieId - удаляет сохранённый фильм по ID

### :rocket: Технологии
- Node.js 
- Express.js 
- MongoDB 
- Rest API
- nginx 

