const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
// const helmet = require('helmet');
const cors = require('cors');
// const limiter = require('./utils/limiter');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralErrorHandler = require('./middlewares/central-error-handler');
const { BASE_URL } = require('./config');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(BASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const allowedCors = [
  'https://a-z.movies-explorer.students.nomoredomains.monster',
  'http://a-z.movies-explorer.students.nomoredomains.monster',
  'https://www.a-z.movies-explorer.students.nomoredomains.monster',
  'http://www.a-z.movies-explorer.students.nomoredomains.monster',
  'http://localhost:3000',
  'http://localhost:3001',
];

// app.use(cors());

// app.use((req, res, next) => {
//   const { origin } = req.headers;

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin *', origin);
// 	}

//   next();
// });

const corsOptions = {
  origin(origin, callback) {
    if (allowedCors.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS.'));
    }
  },
};

app.use(cors(corsOptions));

// app.options('*', cors());
app.use(requestLogger);
// app.use(limiter);
// app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
