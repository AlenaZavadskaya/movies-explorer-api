const { Joi, celebrate } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const userRegisterValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'Поле "name" должно быть заполнено',
        'string.min': 'Поле "name" должно быть не менее 2 символов',
        'string.max': 'Поле "name" должно быть не более 30 символов',
        'any.required': 'Поле "name" обязательное для заполнения',
      }),
    email: Joi.string().required().email().messages({
      'string.empty': 'Поле "email" должно быть заполнено',
      'string.email': 'Поле "email" содержит некорректные данные',
      'any.required': 'Поле "email" обязательное для заполнения',
    }),
    password: Joi.string().required().min(6).messages({
      'string.empty': 'Поле "password" должно быть заполнено',
      'string.min': 'Поле "password" должно быть не менее 6 символов',
      'any.required': 'Поле "password" обязательное для заполнения',
    }),
  }),
});

const userLoginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': 'Поле "email" должно быть заполнено',
      'string.email': 'Поле "email" содержит некорректные данные',
      'any.required': 'Поле "email" обязательное для заполнения',
    }),
    password: Joi.string().required().min(6).messages({
      'string.empty': 'Поле "password" должно быть заполнено',
      'string.min': 'Поле "password" должно быть не менее 6 символов',
      'any.required': 'Поле "password" обязательное для заполнения',
    }),
  }),
});

const userUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.empty': 'Поле "name" должно быть заполнено',
      'string.min': 'Поле "name" должно быть не менее 2 символов',
      'string.max': 'Поле "name" должно быть не более 30 символов',
      'any.required': 'Поле "name" обязательное для заполнения',
    }),
    email: Joi.string().email().messages({
      'string.empty': 'Поле "email" должно быть заполнено',
      'string.email': 'Поле "email" содержит некорректные данные',
      'any.required': 'Поле "email" обязательное для заполнения',
    }),
  }),
});

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'string.empty': 'Поле "country" должно быть заполнено',
      'any.required': 'Поле "country" обязательное для заполнения',
    }),
    director: Joi.string().required().messages({
      'string.empty': 'Поле "director" должно быть заполнено',
      'any.required': 'Поле "director" обязательное для заполнения',
    }),
    duration: Joi.number().required().messages({
      'any.required': 'Поле "duration" обязательное для заполнения',
    }),
    year: Joi.string().required().messages({
      'string.empty': 'Поле "year" должно быть заполнено',
      'any.required': 'Поле "year" обязательное для заполнения',
    }),
    description: Joi.string().required().messages({
      'string.empty': 'Поле "description" должно быть заполнено',
      'any.required': 'Поле "description" обязательное для заполнения',
    }),
    image: Joi.string()
      .required()
      .uri()
      .custom((value, helper) => {
        const regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gm;
        if (!value.match(regExp)) {
          return helper.message('Поле "image" содержит некорректные данные');
        }
        return value;
      })
      .messages({
        'string.empty': 'Поле "image" должно быть заполнено',
        'any.required': 'Поле "image" обязательное для заполнения',
      }),
    trailer: Joi.string()
      .required()
      .uri()
      .custom((value, helper) => {
        const regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gm;
        if (!value.match(regExp)) {
          return helper.message('Поле "trailer" содержит некорректные данные');
        }
        return value;
      })
      .messages({
        'string.empty': 'Поле "trailer" должно быть заполнено',
        'any.required': 'Поле "trailer" обязательное для заполнения',
      }),
    thumbnail: Joi.string()
      .required()
      .uri()
      .custom((value, helper) => {
        const regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gm;
        if (!value.match(regExp)) {
          return helper.message(
            'Поле "thumbnail" содержит некорректные данные',
          );
        }
        return value;
      })
      .messages({
        'string.empty': 'Поле "thumbnail" должно быть заполнено',
        'any.required': 'Поле "thumbnail" обязательное для заполнения',
      }),
    movieId: Joi.number().required().messages({
      'any.required': 'Поле "movieId" обязательное для заполнения.',
    }),
    nameRU: Joi.string().required().messages({
      'string.empty': 'Поле "nameRU" должно быть заполнено',
      'any.required': 'Поле "nameRU" обязательное для заполнения',
    }),
    nameEN: Joi.string().required().messages({
      'string.empty': 'Поле "nameEN" должно быть заполнено',
      'any.required': 'Поле "nameEN" обязательное для заполнения',
    }),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object()
    .keys({
      movieId: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (ObjectId.isValid(value)) {
            return value;
          }
          return helpers.message('id указано некорректно');
        }),
    })
    .unknown(true),
});

module.exports = {
  userRegisterValidation,
  userLoginValidation,
  userUpdateValidation,
  movieValidation,
  movieIdValidation,
};
