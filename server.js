const express = require('express');

const app = express();

// Middleware para permitir CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Permitir todas las orígenes
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Rutas
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/casino', (req, res) => {
    res.sendFile(__dirname + '/public/casino.html');
});

app.get('/hotel', (req, res) => {
    res.sendFile(__dirname + '/public/hotel.html');
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
