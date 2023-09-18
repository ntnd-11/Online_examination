const express = require('express');

const { signin, changePassword } = require('../controllers/auth.controller');
const { isAuthenticated } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/signin', signin);
router.post('/change-password', isAuthenticated, changePassword);

module.exports = router;
