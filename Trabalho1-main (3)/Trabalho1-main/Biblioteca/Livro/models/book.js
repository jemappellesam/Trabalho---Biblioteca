'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Book = sequelize.define('Book', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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

  return Book;
};
