const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

router.get('/', empresaController.getEmpresas);
router.get('/:id', empresaController.getEmpresaById);
router.post('/', empresaController.createEmpresa);
router.put('/:id', empresaController.updateEmpresa);
router.delete('/:id', empresaController.deleteEmpresa);
router.get('/:id/resgates', empresaController.getResgatesEmpresa);

module.exports = router;
