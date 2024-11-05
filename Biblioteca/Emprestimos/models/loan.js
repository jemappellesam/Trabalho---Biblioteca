const { DataTypes, Sequelize } = require('sequelize');
const config = require('../config/config.json'); 
const sequelize = new Sequelize(config.development); 

const Loan = sequelize.define('Loan', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  livro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Loan;
