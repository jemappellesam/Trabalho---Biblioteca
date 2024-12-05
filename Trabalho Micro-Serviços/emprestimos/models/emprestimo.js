const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Emprestimo = sequelize.define('Emprestimo', {
  livroId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dataEmprestimo: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  dataDevolucao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'ativo', // status do empréstimo: ativo ou devolvido
  },
})

module.exports = Emprestimo
