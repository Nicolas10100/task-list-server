const express = require('express');
const listEditRouter = express.Router();
// Importa la lista de tareas
const tasks = require('./tasks');

// Ruta para crear una tarea
listEditRouter.post('/create', (req, res) => {
    try {
        // Obtén la información de la nueva tarea desde el cuerpo de la solicitud
        const { description } = req.body;

        // Genera un nuevo ID (puedes usar una biblioteca como `uuid` para esto)
        const newTaskId = Math.random().toString(36).substring(7);

        // Crea la nueva tarea
        const newTask = {
            id: newTaskId,
            isCompleted: false,
            description: description,
        };

        // Agrega la nueva tarea a la lista de tareas
        tasks.push(newTask);

        // Responde con la nueva tarea creada
        res.json(newTask);
    } catch (error) {
        // Maneja errores en caso de que haya algún problema en la creación
        console.error(error);
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
});


// Ruta para eliminar una tarea
listEditRouter.delete('/delete/:taskId', (req, res) => {
    try {
        // Obtén el ID de la tarea a eliminar desde los parámetros de la URL
        const taskId = req.params.taskId;

        // Busca la tarea con el ID proporcionado
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        // Si la tarea no se encuentra, responde con un error
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        // Elimina la tarea de la lista
        const deletedTask = tasks.splice(taskIndex, 1)[0];

        // Responde con la tarea eliminada
        res.json(deletedTask);
    } catch (error) {
        // Maneja errores en caso de que haya algún problema en la eliminación
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
});

// Ruta para actualizar una tarea
listEditRouter.put('/update/:taskId', (req, res) => {
    try {
        // Obtén el ID de la tarea a actualizar desde los parámetros de la URL
        const taskId = req.params.taskId;

        // Busca la tarea con el ID proporcionado
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        // Si la tarea no se encuentra, responde con un error
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        // Obtén la nueva información de la tarea desde el cuerpo de la solicitud
        const { isCompleted, description } = req.body;

        // Actualiza la tarea
        tasks[taskIndex] = {
            id: taskId,
            isCompleted: isCompleted !== undefined ? isCompleted : tasks[taskIndex].isCompleted,
            description: description !== undefined ? description : tasks[taskIndex].description,
        };

        // Responde con la tarea actualizada
        res.json(tasks[taskIndex]);
    } catch (error) {
        // Maneja errores en caso de que haya algún problema en la actualización
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
});

module.exports = listEditRouter;
