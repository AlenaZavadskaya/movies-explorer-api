const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => {
      res.send(movies);
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
      res.send({ movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
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
        throw new NotFoundError('Фильм не найден');
      } else if ((movie.owner._id).toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((removedMovie) => {
            res.send(removedMovie);
          })
          .catch((error) => {
            if (error.name === 'CastError') {
              throw new NotFoundError('Фильм не найден');
            } else {
              next(error);
            }
          });
      } else {
        throw new ForbiddenError(
          'Вы не можете удалять фильмы других пользователей',
        );
      }
    })
    .catch(next);
};
