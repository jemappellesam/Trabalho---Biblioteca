const express = require('express')
const bodyParser = require('body-parser')
const emprestimosRouter = require('./routes/emprestimos')

const app = express()


// Middleware para interpretar JSON
app.use(bodyParser.json())

// Definição da rota principal para empréstimos
app.use('/api/emprestimos', emprestimosRouter)

// Porta em que o serviço será executado
const PORT = 3003

app.listen(PORT, () => {
    console.log(`Serviço de empréstimos rodando em http://localhost:${PORT}/api/emprestimos`)
})
