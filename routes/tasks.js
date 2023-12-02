const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');

router.post('/', taskController.createTask);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);
router.get('/', taskController.getAllTasks);
router.get('/completed', taskController.getCompletedTasks);
router.get('/incomplete', taskController.getIncompleteTasks);
router.get('/:taskId', taskController.getTaskById);

// Nueva ruta protegida
router.get('/protected', taskController.getProtectedData);

module.exports = router;
