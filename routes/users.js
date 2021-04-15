const router = require('express').Router();
const { createUser, getCurrentUser, updateUser } = require('../controllers/users');
const { userRegisterValidation, userUpdateValidation } = require('../middlewares/serverDataValidator');

router.get('/users/me', getCurrentUser);
router.post('/users/me', userRegisterValidation, createUser);
router.patch('/users/me', userUpdateValidation, updateUser);

module.exports = router;
