const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
const tasks = require('./tasks');
// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Usa los routers en rutas específicas
app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

// Ruta para obtener la lista de tareas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
