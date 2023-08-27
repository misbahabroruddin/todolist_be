const router = require('express').Router();
const authRoute = require('./auth');
const userRouter = require('./user');
const todoRouter = require('./todo');
const authMiddleware = require('./../middlewares/auth');

router.use('/auth', authRoute);
router.use(authMiddleware);
router.use('/user', userRouter);
router.use('/todos', todoRouter);

module.exports = router;
