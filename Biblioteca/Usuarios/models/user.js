// Usuarios/models/user.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return User;
};
