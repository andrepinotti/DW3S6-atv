const SalasModel = require("../model/salasModel")

const getAllSalas = async (req, res) => {
    try {
        const result = await SalasModel.getAllSalas();
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};

const getSalaById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await SalasModel.getSalaById(id);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Sala de aula não encontrada ou removida' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};

const createSala = async (req, res) => {
    const { descricao, localizacao, capacidade } = req.body;
    try {
        const newSala = await SalasModel.createSala(descricao, localizacao, capacidade);
        res.status(201).json(newSala.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};

const removeSala = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await SalasModel.removeSala(id);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Sala de aula não encontrada ou já removida' });
        }
        res.json({ message: 'Sala de aula removida com sucesso', sala: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};

const updateSala = async (req, res) => {
    const { id } = req.params;
    const { descricao, localizacao, capacidade } = req.body;
    
    try {
        const result = await SalasModel.updateSala(id, descricao, localizacao, capacidade);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Sala de aula não encontrada ou já removida' });
        }
        res.json({ message: 'Sala de aula atualizada com sucesso', sala: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    getAllSalas,
    getSalaById,
    createSala,
    removeSala,
    updateSala
};