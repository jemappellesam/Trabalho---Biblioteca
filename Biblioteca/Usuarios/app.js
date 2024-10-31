const express = require('express');
const sequelize = require('./config/config.json').development;
const User = require('./models/user'); 
const usuariosRouter = require('./routes/usuarios');

const app = express();
app.use(express.json());


app.use('/usuarios', usuariosRouter);

app.listen(3000, async () => {
  console.log(`Servidor rodando`);
  await User.sync(); 
});
