const express = require('express')
const { sequelize } = require('./models')
const livrosRouter = require('./routes/livros')

const app = express()

app.use(express.json())
app.use('/livros', livrosRouter)

app.listen(3001, async () => {
    console.log('Servidor de Livros rodando na porta 3001')
    try {
      await sequelize.sync({ force: false })
      console.log('Banco de dados sincronizado')
    } catch (error) {
      console.error('Erro ao sincronizar o banco de dados:', error)
    }
  })

