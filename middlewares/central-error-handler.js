const NotFoundError = require('../errors/not-found-err');

module.exports = (err, req, res, next) => {
  const { status = 500, message } = err;

  res.status(status).send({
    message: status === 500 ? 'На сервере произошла ошибка' : message,
  });
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
};
