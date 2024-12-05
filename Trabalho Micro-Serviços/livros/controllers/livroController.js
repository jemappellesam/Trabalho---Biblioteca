const livroService = require('../services/livroService')

const criarLivro = async (req, res) => {
  try {
    const livro = await livroService.criarLivro(req.body)
    res.status(201).json(livro)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const listarLivros = async (req, res) => {
  try {
    const livros = await livroService.listarLivros()
    res.status(200).json(livros)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const buscarLivro = async (req, res) => {
  try {
    const livro = await livroService.buscarLivroPorId(req.params.id)
    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' })
    }
    res.status(200).json(livro)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const atualizarDisponibilidade = async (req, res) => {
  try {
    const livro = await livroService.atualizarDisponibilidade(req.params.id, req.body)
    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' })
    }
    res.status(200).json(livro)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  criarLivro,
  listarLivros,
  buscarLivro,
  atualizarDisponibilidade
}
