const { registrarEmprestimo, listarEmprestimos, registrarDevolucao } = require('../services/emprestimoService');

const criarEmprestimo = async (req, res) => {
  try {
    const emprestimo = await registrarEmprestimo(req.body);
    res.status(201).json(emprestimo);
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
}

const obterEmprestimos = async (req, res) => {
  try {
    const emprestimos = await listarEmprestimos();
    res.status(200).json(emprestimos);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

const devolverEmprestimo = async (req, res) => {
  try {
    const emprestimo = await registrarDevolucao(req.params.id);
    res.status(200).json(emprestimo);
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
}

module.exports = { criarEmprestimo, obterEmprestimos, devolverEmprestimo };
