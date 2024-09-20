const express = require('express');
const path = require('path');
const app = express();

// Definir las rutas para los archivos estáticos
app.use(express.static('public'));

// Ruta para la página principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para la página del casino (casino.html)
app.get('/casino', (req, res) => {
    res.sendFile(path.join(__dirname, 'casino.html'));
});

// Ruta para la página del hotel (hotel.html)
app.get('/hotel', (req, res) => {
    res.sendFile(path.join(__dirname, 'hotel.html'));
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});