const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')

router.post('/usuarios', usuarioController.criarUsuario)
router.get('/usuarios', usuarioController.listarUsuarios)
router.get('/usuarios/:id', usuarioController.buscarUsuario)

module.exports = router
