'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.json')['development'];

const db = {};
let sequelize = new Sequelize(config.database, config.username, config.password, config); // Ajuste a configuração de acordo com seu banco SQLite

// Carrega os modelos dinamicamente
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js') // Ignora o próprio index.js
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes); // Chama a função que retorna o modelo
    db[model.name] = model; // Adiciona o modelo ao db
  });

// Agora, configure as associações após todos os modelos serem carregados
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Associa os modelos entre si
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; // Exporta todos os modelos
