# Projeto de API de Usuários

Este projeto implementa uma API para gerenciamento de usuários utilizando **Express.js** e **Sequelize** com **SQLite** como banco de dados. A API possui rotas para criação, listagem e busca de usuários.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução para o código JavaScript no servidor.
- **Express.js** - Framework para criação da API.
- **Sequelize** - ORM para interagir com o banco de dados SQLite.
- **SQLite** - Banco de dados leve para persistência dos dados.
- **Sequelize CLI** - Ferramenta para gerenciar o banco de dados e rodar migrações.

## Pré-Requisitos

Certifique-se de ter as seguintes dependências instaladas em sua máquina:

- **Node.js**: [Instale o Node.js](https://nodejs.org/)
- **npm** (gerenciador de pacotes do Node.js): Vem automaticamente com o Node.js.

---

## Passo a Passo para Rodar o Projeto

### 1. Clonar o Repositório

Clone o repositório para sua máquina local utilizando o comando abaixo:

    git clone <URL do repositório>
    cd <diretório do projeto>

### 2. Instalar as Dependências

Instale as dependências do projeto com o comando npm:

    npm install

### 3. Configuração do Banco de Dados

O banco de dados utilizado é o SQLite. O Sequelize será responsável por criar e gerenciar o banco de dados localmente.

O arquivo de configuração do banco de dados está localizado em config/config.json.

    Ambiente de Desenvolvimento:
      Dialeto: sqlite
      Localização do banco de dados: ./database.sqlite3

### 4. Rodar as Migrações

As migrações configuram o banco de dados criando as tabelas e suas relações. No caso, a migração cria a tabela Users.

Rodar a migração para criar a tabela Users:

    npx sequelize-cli db:migrate

Isso criará a tabela Users no banco de dados SQLite definido em config/config.json.

### 5. Rodar o Servidor

Execute o servidor utilizando o seguinte comando:

    npm start

A API estará rodando localmente na porta 3000. Você pode acessar as rotas da API nos seguintes endpoints:

POST /usuarios: Cadastrar um novo usuário.

GET /usuarios: Listar todos os usuários.

GET /usuarios/: Buscar um usuário pelo ID.

### Endpoints da API

### 1. POST /usuarios - Cadastrar um Novo Usuário

Este endpoint recebe um objeto no corpo da requisição com os seguintes campos:

nome (string): Nome do usuário.
email (string): Email do usuário (deve ser único).
cpf (string): CPF do usuário (deve ser único).
nascimento (date): Data de nascimento do usuário.
senha (string): Senha do usuário.

    Exemplo de Requisição:
    URL: http://localhost:3000/usuarios
    Método: POST
    Body (JSON):
    {
      "nome": "João Silva",
      "email": "joao.silva@example.com",
      "cpf": "12345678900",
      "nascimento": "1990-05-15",
      "senha": "senha123"
    }    

    Exemplo de Resposta:
    Status 201 (Created):
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao.silva@example.com",
      "cpf": "12345678900",
      "nascimento": "1990-05-15T00:00:00.000Z",
      "senha": "senha123",
      "createdAt": "2024-11-06T11:54:08.252Z",
      "updatedAt": "2024-11-06T11:54:08.252Z"
    }

    Respostas de Erro:
    Status 400 (Bad Request): Quando faltar algum campo obrigatório.
    {
      "error": "Todos os campos são obrigatórios"
    }


### 2. GET /usuarios - Listar Todos os Usuários

Este endpoint retorna uma lista de todos os usuários cadastrados no banco de dados.

    Exemplo de Requisição:
    URL: http://localhost:3000/usuarios
    Método: GET
    
    Exemplo de Resposta:
    Status 200 (OK):
    [
      {
        "id": 1,
        "nome": "João Silva",
        "email": "joao.silva@example.com",
        "cpf": "12345678900",
        "nascimento": "1990-05-15T00:00:00.000Z",
        "senha": "senha123",
        "createdAt": "2024-11-06T11:54:08.252Z",
        "updatedAt": "2024-11-06T11:54:08.252Z"
      }
    ]


### 3. GET /usuarios/ - Buscar um Usuário por ID

Este endpoint retorna os detalhes de um usuário específico com base no seu ID.

    Exemplo de Requisição:
    URL: http://localhost:3000/usuarios/1
    Método: GET
    
    Exemplo de Resposta:
    Status 200 (OK):
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao.silva@example.com",
      "cpf": "12345678900",
      "nascimento": "1990-05-15T00:00:00.000Z",
      "senha": "senha123",
      "createdAt": "2024-11-06T11:54:08.252Z",
      "updatedAt": "2024-11-06T11:54:08.252Z"
    }

    Resposta de Erro:
    Status 404 (Not Found): Caso o usuário com o ID fornecido não exista.
    {
      "error": "Usuário não encontrado"
    }


### Estrutura do Projeto
.
├── config/
│   └── config.json         
├── migrations/
│   └── 20241031163014-create-user.js   
├── models/
│   ├── index.js          
│   └── user.js             
├── routes/
│   └── usuarios.js         
├── app.js                  
├── .sequelizerc           
├── package.json           
└── README.md           
