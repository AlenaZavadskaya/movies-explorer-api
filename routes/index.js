const router = require('express').Router();
require('dotenv').config();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { userLoginValidation, userRegisterValidation } = require('../middlewares/serverDataValidator');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const errorRoute = require('./error');

router.use('/signin', userLoginValidation, login);
router.use('/signup', userRegisterValidation, createUser);
router.use(auth);
router.use('/', usersRoutes);
router.use('/', moviesRoutes);
router.use('/', errorRoute);

module.exports = router;
