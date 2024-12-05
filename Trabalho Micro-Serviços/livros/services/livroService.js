const Livro = require('../models/livro')

const criarLivro = async (data) => {
  return await Livro.create(data)
}

const listarLivros = async () => {
  return await Livro.findAll()
}

const buscarLivroPorId = async (id) => {
  return await Livro.findByPk(id)
}

const atualizarDisponibilidade = async (id, data) => {
  const livro = await Livro.findByPk(id)
  if (livro) {
    livro.disponivel = data.disponivel
    await livro.save()
    return livro
  }
  return null
}

module.exports = {
  criarLivro,
  listarLivros,
  buscarLivroPorId,
  atualizarDisponibilidade
}
