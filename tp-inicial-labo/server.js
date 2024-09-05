import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '1234',
    database: 'tallerdb'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Endpoint para obtener todos los autos
app.get('/api/autos', (req, res) => {
    db.query('SELECT * FROM autos', (err, results) => {
        if (err) {
            console.error('Error al obtener autos:', err);
            res.status(500).json({ error: 'Error al obtener autos' });
            return;
        }
        res.json(results);
    });
});

// Endpoint para obtener un auto por ID
app.get('/api/autos/:id', (req, res) => {
    const autoId = req.params.id;
    db.query('SELECT * FROM autos WHERE id = ?', [autoId], (err, results) => {
        if (err) {
            console.error('Error al obtener auto:', err);
            res.status(500).json({ error: 'Error al obtener auto' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Auto no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// Endpoint para obtener el historial de mantenimiento de un auto
app.get('/api/autos/:id/mantenimientos', (req, res) => {
    const autoId = req.params.id;
    db.query('SELECT * FROM historial_mantenimiento WHERE auto_id = ?', [autoId], (err, results) => {
        if (err) {
            console.error('Error al obtener mantenimientos:', err);
            res.status(500).json({ error: 'Error al obtener mantenimientos' });
            return;
        }
        res.json(results);
    });
});

// Endpoint para agregar un nuevo mantenimiento
app.post('/api/autos/:id/mantenimientos', (req, res) => {
    const autoId = req.params.id;
    const { mecanico_id, fecha, tipo_de_mantenimiento, descripcion } = req.body;

    const query = 'INSERT INTO historial_mantenimiento (auto_id, mecanico_id, fecha, tipo_de_mantenimiento, descripcion) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [autoId, mecanico_id, fecha, tipo_de_mantenimiento, descripcion], (err, results) => {
        if (err) {
            console.error('Error al agregar mantenimiento:', err);
            res.status(500).json({ error: 'Error al agregar mantenimiento' });
            return;
        }
        res.json({ id: results.insertId, auto_id: autoId, mecanico_id, fecha, tipo_de_mantenimiento, descripcion });
    });
});

// Endpoint para agregar un nuevo auto
app.post('/api/autos', (req, res) => {
    const { marca, modelo, anio, kilometraje, nro_patente } = req.body;
    const query = 'INSERT INTO autos (marca, modelo, anio, kilometraje, nro_patente ) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [marca, modelo, anio, kilometraje, nro_patente], (err, results) => {
        if (err) {
            console.error('Error al agregar auto:', err);
            res.status(500).json({ error: 'Error al agregar auto' });
            return;
        }
        res.json({ id: results.insertId, marca, modelo, anio, kilometraje, nro_patente });
    });
});


// Ruta: GET /api/autos/patente/:nro_patente
app.get('/api/autos/patente/:nro_patente', async (req, res) => {
    const nro_patente = req.params.nro_patente;

    try {
        const auto = await db.query('SELECT * FROM autos WHERE nro_patente = ?', [nro_patente]);

        if (auto.length === 0) {
            return res.status(404).json({ message: 'Auto no encontrado' });
        }

        res.json(auto[0]);
    } catch (error) {
        console.error('Error al obtener el auto:', error);
        res.status(500).json({ message: 'Error al obtener el auto' });
    }
});

// Ruta: GET /api/autos/patente/:nro_patente/mantenimientos
app.get('/api/autos/patente/:nro_patente/mantenimientos', async (req, res) => {
    const nro_patente = req.params.nro_patente;

    try {
        // Buscar el ID del auto por su patente
        const auto = await db.query('SELECT id FROM autos WHERE nro_patente = ?', [nro_patente]);

        if (auto.length === 0) {
            return res.status(404).json({ message: 'Auto no encontrado' });
        }

        const auto_id = auto[0].id;

        // Obtener el historial de mantenimiento usando el ID del auto
        const mantenimientos = await db.query('SELECT * FROM historial_mantenimiento WHERE auto_id = ?', [auto_id]);

        res.json(mantenimientos);
    } catch (error) {
        console.error('Error al obtener el historial de mantenimiento:', error);
        res.status(500).json({ message: 'Error al obtener el historial de mantenimiento' });
    }
});

// Ruta: POST /api/autos/patente/:nro_patente/mantenimientos
app.post('/api/autos/patente/:nro_patente/mantenimientos', async (req, res) => {
    const nro_patente = req.params.nro_patente;
    const { mecanico_id, fecha, tipo_de_mantenimiento, descripcion } = req.body;

    try {
        // Buscar el ID del auto por su patente
        const auto = await db.query('SELECT id FROM autos WHERE nro_patente = ?', [nro_patente]);

        if (auto.length === 0) {
            return res.status(404).json({ message: 'Auto no encontrado' });
        }

        const auto_id = auto[0].id;

        // Insertar el nuevo registro de mantenimiento
        await db.query(
            'INSERT INTO historial_mantenimiento (auto_id, mecanico_id, fecha, tipo_de_mantenimiento, descripcion) VALUES (?, ?, ?, ?, ?)',
            [auto_id, mecanico_id, fecha, tipo_de_mantenimiento, descripcion]
        );

        res.status(201).json({ message: 'Mantenimiento agregado exitosamente' });
    } catch (error) {
        console.error('Error al agregar el mantenimiento:', error);
        res.status(500).json({ message: 'Error al agregar el mantenimiento' });
    }
});


// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
