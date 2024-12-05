const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
})

const Livro = require('./livro')(sequelize, DataTypes)

module.exports = { sequelize, Livro }
