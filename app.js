const express = require('express');
const bodyParser = require('body-parser');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const app = express();
const port = 3000;

// Middleware a nivel de aplicación para gestionar métodos HTTP válidos
const validateHTTPMethod = (req, res, next) => {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

    if (!validMethods.includes(req.method)) {
        return res.status(400).json({ error: 'Método HTTP no válido' });
    }

    next();
};

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Middleware a nivel de aplicación para gestionar métodos HTTP válidos
app.use(validateHTTPMethod);

// Usa los routers en rutas específicas
app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);



app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
