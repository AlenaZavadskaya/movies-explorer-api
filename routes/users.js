const router = require('express').Router();
const { createUser, getCurrentUser, updateUser } = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.post('/users/me', createUser);
router.patch('/users/me', updateUser);

module.exports = router;
