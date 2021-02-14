const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
require('dotenv').config();
const routes = require('./routes/index');

const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());

app.use(requestLogger);

// подключаем мидлвары, роуты и всё остальное...
app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => { // централизованный обработчик ошибок
  const { status = 500, message } = err;

  res.status(status).send({
    message: status === 500 ? 'На сервере произошла ошибка' : message,
  });
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
