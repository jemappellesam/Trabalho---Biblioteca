const express = require('express');
const router = express.Router();
const { Loan, User, Book } = require('../models');

// Registrar Empréstimo
router.post('/', async (req, res) => {
  const { usuarioId, livroId } = req.body;

  try {
    // Verificar se o usuário existe
    const usuario = await User.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verificar se o livro está disponível
    const livro = await Book.findByPk(livroId);
    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    if (!livro.disponibilidade) {
      return res.status(400).json({ message: 'Livro já está emprestado' });
    }

    // Criar o empréstimo
    const emprestimo = await Loan.create({
      usuarioId,
      livroId,
      dataEmprestimo: new Date(),
    });

    // Atualizar a disponibilidade do livro
    livro.disponibilidade = false;
    await livro.save();

    return res.status(201).json(emprestimo);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao registrar o empréstimo', error });
  }
});

// Registrar Devolução
router.post('/:id/devolucao', async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar o empréstimo
    const emprestimo = await Loan.findByPk(id);
    if (!emprestimo) {
      return res.status(404).json({ message: 'Empréstimo não encontrado' });
    }

    // Atualizar a data de devolução
    emprestimo.dataDevolucao = new Date();
    await emprestimo.save();

    // Atualizar a disponibilidade do livro
    const livro = await Book.findByPk(emprestimo.livroId);
    livro.disponibilidade = true;
    await livro.save();

    return res.status(200).json(emprestimo);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao registrar a devolução', error });
  }
});

// Listar todos os empréstimos
router.get('/', async (req, res) => {
  try {
    // Buscar empréstimos com os dados do usuário e livro incluídos
    const emprestimos = await Loan.findAll({
      include: [
        {
          model: User,
          as: 'User',  // Usando o alias da associação definida
          attributes: ['id', 'nome', 'email'], // Especificar os campos do usuário que você deseja retornar
        },
        {
          model: Book,
          as: 'Book',  // Usando o alias da associação definida
          attributes: ['id', 'titulo', 'autor'], // Especificar os campos do livro que você deseja retornar
        },
      ],
    });

    // Retorna os empréstimos de forma mais limpa, desestruturando as relações
    return res.status(200).json(emprestimos.map(emprestimo => ({
      id: emprestimo.id,
      data_empréstimo: emprestimo.data_empréstimo,
      data_devolucao: emprestimo.data_devolucao,
      usuario: emprestimo.User,
      livro: emprestimo.Book,
    })));
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar os empréstimos',
      error: error.message || error,
    });
  }
});

  

module.exports = router;
