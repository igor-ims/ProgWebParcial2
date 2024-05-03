const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth-middleware')

const {login, register, showData} = require('../controllers/user-controller')

router.post('/login', login);
router.post('/register', register);
router.get('/data', protect, showData);

module.exports = router;