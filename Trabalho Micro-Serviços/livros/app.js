const express = require('express')
const sequelize = require('./config/database')
const livrosRoutes = require('./routes/livros')

const app = express()
app.use(express.json())

// Rotas
app.use('/api', livrosRoutes) // Isso deve estar correto

// Conexão com o banco e inicialização do servidor
sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log('Serviço de Livros rodando na porta 3002')
  })
}).catch(error => {
  console.error('Erro ao conectar ao banco:', error)
})
