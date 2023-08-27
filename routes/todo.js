const router = require('express').Router();
const TodoController = require('../controllers/todo.controller');

router.get('/', TodoController.getAll);
router.get('/:id', TodoController.getById);
router.post('/', TodoController.post);
router.put('/:id', TodoController.update);
router.patch('/:id', TodoController.updateStatus);
router.delete('/:id', TodoController.delete);

module.exports = router;
