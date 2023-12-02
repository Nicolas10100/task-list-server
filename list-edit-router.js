// list-edit-router.js
const express = require('express');
const listEditRouter = express.Router();

// Importa la lista de tareas
const tasks = require('./tasks');

// Middleware para validar solicitudes POST y PUT
const validateTaskRequest = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'El cuerpo de la solicitud no puede estar vacío' });
        }

        const { isCompleted, description } = req.body;

        if (req.method === 'POST' && (isCompleted === undefined || description === undefined)) {
            return res.status(400).json({ error: 'Solicitud POST inválida. Faltan atributos necesarios' });
        }

        if (req.method === 'PUT' && (isCompleted !== undefined && typeof isCompleted !== 'boolean')) {
            return res.status(400).json({ error: 'Solicitud PUT inválida. El atributo isCompleted debe ser un booleano' });
        }
    }

    next();
};

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

// Ruta para agregar una tarea
listEditRouter.post('/create', validateTaskRequest, (req, res) => {
    try {
        // Obtén la información de la nueva tarea desde el cuerpo de la solicitud
        const { isCompleted, description } = req.body;

        // Crea una nueva tarea
        const newTask = {
            id: Math.random().toString(36).substring(7), // Genera un ID aleatorio
            isCompleted: isCompleted || false,
            description: description || '',
        };

        // Agrega la nueva tarea a la lista
        tasks.push(newTask);

        // Responde con la nueva tarea creada
        res.json(newTask);
    } catch (error) {
        // Maneja errores en caso de que haya algún problema en la creación
        console.error(error);
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
});

// Ruta para actualizar una tarea
listEditRouter.put('/update/:taskId', validateTaskRequest, (req, res) => {
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

