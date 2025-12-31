const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi ke Database (Service 'db' dari docker-compose)
const pool = new Pool({
    user: process.env.PGUSER,
    host: 'db',
    database: process.env.PGDATABASE,
    password: process.env.PGPASS,
    port: 5432,
});

// GET: Ambil data
app.get('/todos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// POST: Tambah data
app.post('/todos', async (req, res) => {
    const { task } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO todos (task) VALUES ($1) RETURNING *',
            [task]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});