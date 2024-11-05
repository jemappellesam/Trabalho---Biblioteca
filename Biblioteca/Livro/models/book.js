const { DataTypes, Sequelize } = require('sequelize');
const config = require('../config/config.json'); 
const sequelize = new Sequelize(config.development); 

const Book = sequelize.define('Book', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disponibilidade: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

module.exports = Book;
