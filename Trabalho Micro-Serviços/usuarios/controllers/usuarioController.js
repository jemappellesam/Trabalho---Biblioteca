const usuarioService = require('../services/usuarioService')

const criarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.criarUsuario(req.body)
    res.status(201).json(usuario)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.listarUsuarios()
    res.status(200).json(usuarios)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const buscarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.buscarUsuarioPorId(req.params.id)
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }
    res.status(200).json(usuario)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuario
}
