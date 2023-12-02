const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
    // En un escenario real, verificarías las credenciales del usuario
    const user = {
        id: 1,
        username: 'usuarioEjemplo',
    };

    jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            return res.status(500).json({ error: 'Error al generar el token.' });
        }
        res.status(200).json({ token });
    });
});

module.exports = router;
