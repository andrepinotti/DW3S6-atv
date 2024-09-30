const express = require("express");
const router = express.Router();
const pool = require("./src/database/dbConnection.js");

const app = express();

app.use(express.json());

app.get('/salasdeaula', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM salasdeaula WHERE removido = false');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

app.get('/salasdeaula/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM salasdeaula WHERE salasdeaulaid = $1 AND removido = false', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Sala de aula não encontrada ou removida' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

app.post('/salasdeaula', async (req, res) => {
    const { descricao, localizacao, capacidade } = req.body;
    try {
        const newSala = await pool.query(
            'INSERT INTO salasdeaula (descricao, localizacao, capacidade) VALUES ($1, $2, $3) RETURNING *',
            [descricao, localizacao, capacidade]
        );
        res.status(201).json(newSala.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

app.delete('/salasdeaula/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE salasdeaula SET removido = true WHERE salasdeaulaid = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Sala de aula não encontrada ou já removida' });
        }
        res.json({ message: 'Sala de aula removida com sucesso', sala: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

app.listen(3000, () => {
    console.log("Listening at port 3000");
});



//module.exports = router