const router = require('express').Router();
const { createUser, getCurrentUser } = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.post('/users/me', createUser);

module.exports = router;
