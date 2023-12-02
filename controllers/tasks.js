const tasks = [];

function createTask(req, res) {
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ error: 'La descripción de la tarea es obligatoria' });
    }

    const newTask = {
        id: new Date().getTime().toString(),
        isCompleted: false,
        description: description,
    };

    tasks.push(newTask);
    res.status(201).json({ message: 'Tarea creada exitosamente', task: newTask });
}

function updateTask(req, res) {
    const taskId = req.params.taskId;
    const { isCompleted, description } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        isCompleted: isCompleted !== undefined ? isCompleted : tasks[taskIndex].isCompleted,
        description: description !== undefined ? description : tasks[taskIndex].description,
    };

    res.status(200).json({ message: 'Tarea actualizada exitosamente', task: tasks[taskIndex] });
}

function deleteTask(req, res) {
    const taskId = req.params.taskId;

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.status(200).json({ message: 'Tarea eliminada exitosamente', task: deletedTask });
}

function getAllTasks(req, res) {
    res.status(200).json({ tasks: tasks });
}

function getCompletedTasks(req, res) {
    const completedTasks = tasks.filter(task => task.isCompleted);
    res.status(200).json({ tasks: completedTasks });
}

function getIncompleteTasks(req, res) {
    const incompleteTasks = tasks.filter(task => !task.isCompleted);
    res.status(200).json({ tasks: incompleteTasks });
}

function getTaskById(req, res) {
    const taskId = req.params.taskId;

    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.status(200).json({ task: task });
}

function getProtectedData(req, res) {
    res.status(200).json({ message: '¡Esta es información protegida!' });
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getAllTasks,
    getCompletedTasks,
    getIncompleteTasks,
    getTaskById,
    getProtectedData,
};
