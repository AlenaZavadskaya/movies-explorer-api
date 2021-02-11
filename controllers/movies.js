const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(200).send({ movie });
    })
    .catch((err) => {
      // eslint-disable-next-line eqeqeq
      if (err.name == 'ValidationError') {
        throw new BadRequestError('Ошибка валидации');
      }
      next(err);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка не найдена');
      // eslint-disable-next-line eqeqeq
      } else if (movie.owner == req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
          // eslint-disable-next-line no-shadow
          .then((movie) => {
            res.status(200).send({ data: movie });
          })
          .catch((error) => {
            if (error.name === 'CastError') {
              throw new NotFoundError('Карточка не найдена');
            } else {
              next(error);
            }
          });
      } else {
        throw new BadRequestError(
          'Вы не можете удалять карточки других пользователей',
        );
      }
    })
    .catch(next);
};
