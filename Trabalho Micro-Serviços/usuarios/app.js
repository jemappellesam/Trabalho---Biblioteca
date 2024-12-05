const express = require('express')
const sequelize = require('./config/database')
const usuariosRoutes = require('./routes/usuarios')

const app = express()
app.use(express.json())

// Rotas
app.use('/api', usuariosRoutes)

// Conexão com o banco e inicialização do servidor
sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Serviço de Usuários rodando na porta 3001')
  })
}).catch(error => {
  console.error('Erro ao conectar ao banco:', error)
})
