const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

require('dotenv').config();

app.use(express.json());

const tasksRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

app.use('/tasks', verifyToken, tasksRoutes); // Agrega la verificación del token
app.use('/auth', authRoutes);

// Middleware para verificar el token
function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token no válido.' });
    }
}

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
