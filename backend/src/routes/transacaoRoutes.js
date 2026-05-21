const express = require('express');
const router = express.Router();
const transacaoController = require('../controllers/transacaoController');

router.post('/enviar', transacaoController.enviarMoedas);
router.get('/professor/:id', transacaoController.getExtratoProfessor);
router.get('/aluno/:id', transacaoController.getExtratoAluno);

module.exports = router;
