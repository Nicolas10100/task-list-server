const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno desde un archivo .env

const app = express();
const port = 3000;

// Usuarios predefinidos para la autenticación (esto podría venir de una base de datos en un entorno de producción)
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    // Agrega más usuarios según sea necesario
];

app.use(express.json());

// Ruta para autenticación (generación de token JWT)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Buscar el usuario en la lista
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Crear un token JWT
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});

// Ruta protegida que verifica el token JWT
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Ruta protegida, acceso concedido' });
});

// Middleware para verificar el token JWT en el encabezado de autorización
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }

        req.user = user;
        next();
    });
}

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
