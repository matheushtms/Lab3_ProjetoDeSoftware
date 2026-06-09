const express = require('express');
const router = express.Router();
const vantagemController = require('../controllers/vantagemController');

router.get('/', vantagemController.getVantagens);
router.post('/', vantagemController.criarVantagem);
router.post('/resgatar', vantagemController.resgatarVantagem);
router.put('/:id', vantagemController.editarVantagem);
router.delete('/:id', vantagemController.deletarVantagem);

module.exports = router;
