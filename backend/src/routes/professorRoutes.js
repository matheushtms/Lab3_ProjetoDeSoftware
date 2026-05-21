const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

router.get('/', professorController.getProfessores);
router.get('/:id', professorController.getProfessorById);
router.post('/', professorController.createProfessor);

module.exports = router;
