// Usuarios/app.js
const express = require('express');
const { sequelize } = require('./models');
const usuariosRouter = require('./routes/usuarios');

const app = express();

app.use(express.json());

app.use('/usuarios', usuariosRouter);

app.listen(3000, async () => {
  console.log('Servidor rodando na porta 3000');
  try {
    await sequelize.sync({ force: false });
    console.log('Banco de dados sincronizado');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
});
