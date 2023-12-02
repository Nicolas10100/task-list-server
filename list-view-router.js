const express = require('express');
const listViewRouter = express.Router();
// Importa la lista de tareas
const tasks = require('./tasks');

// Ruta para obtener tareas completas
listViewRouter.get('/completed', (req, res) => {
    const completedTasks = tasks.filter(task => task.isCompleted);
    res.json(completedTasks);
});

// Ruta para obtener tareas incompletas
listViewRouter.get('/incomplete', (req, res) => {
    const incompleteTasks = tasks.filter(task => !task.isCompleted);
    res.json(incompleteTasks);
});

module.exports = listViewRouter;
