const express = require('express')
const { Book } = require('../models')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { titulo, autor, disponibilidade } = req.body

    if (!titulo || !autor) {
      return res.status(400).json({ error: 'Título e autor são obrigatórios' })
    }

    const disponibilidadeBoolean = disponibilidade === "false" || disponibilidade === false ? false : true

    const livro = await Book.create({
      titulo,
      autor,
      disponibilidade: disponibilidadeBoolean
    })

    res.status(201).json(livro)
  } catch (error) {
    console.error('Erro ao cadastrar livro:', error)
    res.status(400).json({ error: error.errors ? error.errors.map(e => e.message) : error.message })
  }
});


router.get('/', async (req, res) => {
  try {
    const livros = await Book.findAll();
    res.status(200).json(livros);
  } catch (error) {
    console.error('Erro ao listar livros:', error)
    res.status(500).json({ error: error.message })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const livroId = Number(req.params.id)

    if (isNaN(livroId)) {
      return res.status(400).json({ error: 'ID inválido. Deve ser um número.' })
    }

    const livro = await Book.findByPk(livroId)

    if (livro) {
      res.status(200).json(livro)
    } else {
      res.status(404).json({ error: 'Livro não encontrado' })
    }
  } catch (error) {
    console.error('Erro ao buscar livro:', error)
    res.status(500).json({ error: error.message })
  }
})



router.patch('/:id', async (req, res) => {
  try {
    const { disponibilidade } = req.body;
    const livro = await Book.findByPk(req.params.id);
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' })
    }

    livro.disponibilidade = disponibilidade || livro.disponibilidade
    await livro.save()

    res.status(200).json(livro);
  } catch (error) {
    console.error('Erro ao atualizar disponibilidade do livro:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
