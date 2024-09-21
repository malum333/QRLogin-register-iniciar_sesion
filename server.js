const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

// Crear conexión a la base de datos
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'kali',
    password: 'kali',
    database: 'nombre_de_tu_base_de_datos' // Cambia esto al nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL/MariaDB');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// Ruta para guardar datos en la base de datos
app.post('/http://localhost:3000/casino', (req, res) => {
    console.log('Datos recibidos:', req.body); // Añade esto
    const { username, password } = req.body;

    // Verificar que los datos no sean undefined
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username y password son requeridos' });
    }

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error al guardar los datos en la base de datos:', err);
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }
        res.json({ success: true, message: 'Datos guardados en la base de datos' });
    });
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
