const pool = require("../database/dbConnection");

const getAllSalas = async () => {
    return pool.query('SELECT * FROM salasdeaula WHERE removido = false');
};

const getSalaById = async (id) => {
    return pool.query('SELECT * FROM salasdeaula WHERE salasdeaulaid = $1 AND removido = false', [id]);
};

const createSala = async (descricao, localizacao, capacidade) => {
    return pool.query(
        'INSERT INTO salasdeaula (descricao, localizacao, capacidade) VALUES ($1, $2, $3) RETURNING *',
        [descricao, localizacao, capacidade]
    );
};

const removeSala = async (id) => {
    return pool.query(
        'UPDATE salasdeaula SET removido = true WHERE salasdeaulaid = $1 RETURNING *',
        [id]
    );
};

const updateSala = async (id, descricao, localizacao, capacidade) => {
    return pool.query(
        'UPDATE salasdeaula SET descricao = $1, localizacao = $2, capacidade = $3 WHERE salasdeaulaid = $4 AND removido = false RETURNING *',
        [descricao, localizacao, capacidade, id]
    );
};

module.exports = {
    getAllSalas,
    getSalaById,
    createSala,
    removeSala,
    updateSala
};