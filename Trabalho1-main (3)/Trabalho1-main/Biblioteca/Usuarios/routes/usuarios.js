// Usuarios/routes/usuarios.js
const express = require('express');
const { User } = require('../models');

const router = express.Router();

// Rota para cadastrar um novo usuário (POST /usuarios)
router.post('/', async (req, res) => {
  try {
    const { nome, email, cpf, nascimento, senha } = req.body;

    if (!nome || !email || !cpf || !nascimento || !senha) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const user = await User.create({ nome, email, cpf, nascimento, senha });
    
    res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(400).json({ error: error.errors ? error.errors.map(e => e.message) : error.message });
  }
});

// Rota para listar todos os usuários (GET /usuarios)
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para buscar um usuário pelo ID (GET /usuarios/:id)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
