const express = require('express')
const { criarEmprestimo, obterEmprestimos, devolverEmprestimo } = require('../controllers/emprestimoController')
const router = express.Router()

router.post('/', criarEmprestimo)
router.get('/', obterEmprestimos)
router.patch('/:id/devolucao', devolverEmprestimo)

module.exports = router
