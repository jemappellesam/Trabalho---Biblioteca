const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Livro = sequelize.define('Livro', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disponivel: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Livro
