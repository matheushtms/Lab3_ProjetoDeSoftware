const express = require('express');
const router = express.Router();
const transacaoController = require('../controllers/transacaoController');

router.post('/enviar', transacaoController.enviarMoedas);
router.get('/test-email', async (req, res) => {
  const { sendCoinTransferEmailToAluno } = require('../services/emailService');
  try {
    await sendCoinTransferEmailToAluno("matheusht100@gmail.com", "Teste App", "Admin", 50, "Testando API");
    res.json({ message: 'E-mail de teste executado pela rota da API. Cheque o console do backend.' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
router.get('/professor/:id', transacaoController.getExtratoProfessor);
router.get('/aluno/:id', transacaoController.getExtratoAluno);

module.exports = router;
