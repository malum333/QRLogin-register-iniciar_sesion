const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Servir archivos estáticos
app.use(express.static('public'));
app.use(cookieParser());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/casino', (req, res) => {
    res.sendFile(__dirname + '/public/casino.html');
});

app.get('/hotel', (req, res) => {
    res.sendFile(__dirname + '/public/hotel.html');
});

// Conexión a la base de datos PostgreSQL
const { Pool } = require('pg');

const pool = new Pool({
    user: 'ATLAS',
    host: 'localhost',
    database: 'atlas',
    password: 'atlas',
    port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verifica si el usuario ya existe
        const checkQuery = 'SELECT * FROM users WHERE username = $1';
        const checkValues = [username];
        const userExists = await pool.query(checkQuery, checkValues);

        if (userExists.rows.length > 0) {
            // Si el usuario ya existe, simplemente inicia sesión
            res.cookie('username', username, { sameSite: 'Strict' });
            return res.send({ success: true, message: 'Inicio de sesión exitoso' });
        } else {
            // Si el usuario no existe, lo crea
            const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
            const values = [username, password];
            await pool.query(query, values);
            
            // Verifica que la inserción se realizó correctamente
            console.log('Usuario agregado:', username); // Aquí va el console.log

            res.cookie('username', username, { sameSite: 'Strict' });
            return res.send({ success: true, message: 'Usuario registrado exitosamente' });
        }
    } catch (err) {
        console.error('Error al realizar la inserción', err);
        res.status(500).send({ success: false, message: 'Error en el servidor' });
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
