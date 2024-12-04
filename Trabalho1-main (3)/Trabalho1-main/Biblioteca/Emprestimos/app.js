const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const emprestimosRoutes = require('./routes/emprestimos');

// Middleware
app.use(bodyParser.json());

// Roteamento
app.use('/emprestimos', emprestimosRoutes);

// Iniciar o servidor
app.listen(3003, () => {
  console.log('Servidor de Empréstimos rodando na porta 3003');
});
