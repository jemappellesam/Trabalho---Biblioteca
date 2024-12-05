const express = require('express')
const router = express.Router()
const livroController = require('../controllers/livroController')

// Rotas para livros
router.post('/livros', livroController.criarLivro)
router.get('/livros', livroController.listarLivros)
router.get('/livros/:id', livroController.buscarLivro)
router.patch('/livros/:id', livroController.atualizarDisponibilidade)

module.exports = router
