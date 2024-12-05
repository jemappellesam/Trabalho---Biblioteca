const Usuario = require('../models/usuario')

const criarUsuario = async (data) => {
  return await Usuario.create(data)
}

const listarUsuarios = async () => {
  return await Usuario.findAll()
}

const buscarUsuarioPorId = async (id) => {
  return await Usuario.findByPk(id)
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId
}
