const express = require('express');
const app = express();

// Servir archivos estáticos
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/casino', (req, res) => {
    res.sendFile(__dirname + '/public/casino.html');
});

app.get('/hotel', (req, res) => {
    res.sendFile(__dirname + '/public/hotel.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});