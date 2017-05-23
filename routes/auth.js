const authCtrl = require('../controllers/auth');
const router = require('express').Router();

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

module.exports = router;