const router = require('express').Router();
const UserController = require('../controllers/user.controller');

router.get('/me', UserController.getUserLogin);
router.put('/me', UserController.updateUserLogin);

module.exports = router;
