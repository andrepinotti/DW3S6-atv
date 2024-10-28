const express = require('express');
const router = express.Router();
const SalasController = require('../controllers/salasController.js');

router.get('/salasdeaula', SalasController.getAllSalas);
router.get('/salasdeaula/:id', SalasController.getSalaById);
router.post('/salasdeaula', SalasController.createSala);
router.delete('/salasdeaula/:id', SalasController.removeSala);
router.put('/salasdeaula/:id', SalasController.updateSala);

module.exports = router;