# Arquitetura de Microserviços - Sistema de Gerenciamento de Biblioteca

Este projeto implementa um sistema de gerenciamento de biblioteca baseado na arquitetura de microserviços. A aplicação é distribuída em três microserviços independentes, cada um responsável por uma parte específica da aplicação, com comunicação entre eles através de APIs REST e formato de dados JSON.

Equipe: Samuel Paiva, Julio Correa, Luiz Felipe, Matheus Rezende, Bruno Daniel e Yurik Motoyama

# Tecnologias Utilizadas

- **Node.js** - Ambiente de execução para o código JavaScript no servidor.
- **Express.js** - Framework para criação da API.
- **Sequelize** - ORM para interagir com o banco de dados SQLite.
- **SQLite** - Banco de dados leve para persistência dos dados.
- **Sequelize CLI** - Ferramenta para gerenciar o banco de dados e rodar migrações.

# Microserviços

- **Serviço de Usuários:** Gerencia os usuários da biblioteca, incluindo informações como nome, email, CPF e data de nascimento.
- **Serviço de Livros:** Gerencia o catálogo de livros da biblioteca, incluindo título, autor e disponibilidade dos livros.
- **Serviço de Empréstimos:** Gerencia os empréstimos e devoluções dos livros, verificando a disponibilidade dos livros e a validade dos usuários.

# Funcionamento da Aplicação

A aplicação é estruturada em três serviços independentes, cada um com suas próprias responsabilidades, mas que se comunicam entre si para oferecer a funcionalidade completa de gerenciamento de uma biblioteca. As interações entre os serviços ocorrem por meio de APIs REST.

### Fluxo de Interação:

- **Serviço de Empréstimos:**
    - ****Quando um usuário solicita um empréstimo de um livro, o Serviço de Empréstimos verifica se o livro está disponível, consultando o Serviço de Livros.****
    - ****O Serviço de Empréstimos também verifica se o usuário que está solicitando o empréstimo é válido, consultando o Serviço de Usuários.****
    - ****Se o livro estiver disponível e o usuário for válido, o empréstimo é registrado e o status do livro é atualizado para "emprestado".****
      
- **Serviço de Livros:**
    - ****O Serviço de Livros gerencia a criação, listagem e atualização de livros no catálogo, incluindo a disponibilidade dos livros (disponível ou emprestado).****

- **Serviço de Usuários:**
    - ****O Serviço de Usuários gerencia as informações de todos os usuários cadastrados na biblioteca, como alunos e funcionários.****

# Como os Microserviços se Comunicão

Os três microserviços comunicam-se entre si para realizar as operações necessárias. Aqui está como eles interagem:

- **Empréstimo de Livro:**
    - ****Quando um usuário solicita o empréstimo de um livro, o Serviço de Empréstimos faz duas verificações:****
        1. ****Verifica se o livro está disponível: Para isso, consulta o Serviço de Livros.****
        2. ****Verifica se o usuário existe: Através de uma consulta ao Serviço de Usuários.****
           
- **Atualização de Disponibilidade de Livro:**
    - ****Quando um empréstimo é registrado com sucesso, o Serviço de Empréstimos atualiza o status do livro para "emprestado", utilizando a API do Serviço de Livros.****
      
- **Cadastro e Gerenciamento de Usuários:**
  - ****O Serviço de Usuários cuida do cadastro, listagem e consulta dos usuários. Quando um novo usuário se cadastra ou quando um usuário solicita um empréstimo, o Serviço de Empréstimos consulta o serviço para validar o usuário.****
    
- **Cadastro e Gerenciamento de Livros:**
  - ****O Serviço de Livros permite o cadastro, consulta e atualização dos livros, sendo consultado pelo Serviço de Empréstimos para verificar a disponibilidade dos livros e pelo Serviço de Usuários para garantir que o livro não seja emprestado a um usuário não             cadastrado.****

# Passo a Passo para Rodar o Projeto

1. **Certifique-se de ter as seguintes dependências instaladas em sua máquina:**

    - **Node.js**: [Instale o Node.js](https://nodejs.org/)
    - **npm** (gerenciador de pacotes do Node.js): Vem automaticamente com o Node.js.

2. **Clonar o Repositório**

    - **Clone o repositório para sua máquina local utilizando o comando abaixo:**

            git clone <URL do repositório>
            cd <diretório do projeto>

3. **Instalar as Dependências**

    - **Instale as dependências do projeto com o comando npm:**
    
            npm install

4. **Configuração do Banco de Dados**

    - **O banco de dados utilizado é o SQLite. O Sequelize será responsável por criar e gerenciar o banco de dados localmente.**
    
    - **O arquivo de configuração do banco de dados está localizado em config/config.json.**
    
            Ambiente de Desenvolvimento:
              Dialeto: sqlite
              Localização do banco de dados: ./database.sqlite3

5. **Rodar as Migrações**

    - **As migrações configuram o banco de dados criando as tabelas e suas relações. No caso, a migração cria a tabela Users.
    
    - **Rodar a migração para criar a tabela Users:
    
             npx sequelize-cli db:migrate

    - **Isso criará a tabela Users no banco de dados SQLite definido em config/config.json.**

6. **Rodar o Servidor**

    - **Execute o servidor utilizando o seguinte comando:**
    
            npm start
    
    - **A API estará rodando localmente na porta 3001, 3002 e 3003.**

# Endpoints da API

### Serviço de Usuários

O **Serviço de Usuários** é responsável pelo cadastro, listagem e busca de usuários da biblioteca.

- **POST /usuarios:** Cadastrar um novo usuário na biblioteca.
  
  - **Este endpoint recebe um objeto no corpo da requisição com os seguintes campos:**

    - **nome (string): Nome do usuário.**
    - **email (string): Email do usuário (deve ser único).**
    - **cpf (string): CPF do usuário (deve ser único).**
    - **nascimento (date): Data de nascimento do usuário.**
    - **senha (string): Senha do usuário.**

  
    ```json
    # Exemplo de Requisição:
    
    {
      "nome": "João Silva",
      "email": "joao.silva@example.com",
      "cpf": "12345678900",
      "nascimento": "1990-05-15",
      "senha": "senha123"
    }

    # Exemplo de Resposta:
    
    # Status 201 (Created):
    
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

- **GET /usuarios:** Listar todos os usuários cadastrados.
  
  - **Este endpoint retorna uma lista de todos os usuários cadastrados no banco de dados.**
  
    ```json
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
              },
              {
                  "id": 2,
                  "nome": "João",
                  "email": "joao.@example.com",
                  "cpf": "12985678900",
                  "nascimento": "1990-05-15T00:00:00.000Z",
                  "senha": "senha1234",
                  "createdAt": "2024-11-06T11:56:18.552Z",
                  "updatedAt": "2024-11-06T11:56:18.552Z"
              }
          ]

  
- **GET /usuarios/:id:** Buscar um usuário específico pelo ID.
    - **Este endpoint retorna os detalhes de um usuário específico com base no seu ID.**
      
        ```json
            # Exemplo de Requisição:
        
                URL: http://localhost:3000/usuarios/1
        
            # Método: GET
            
            # Exemplo de Resposta:

            # Status 200 (OK):
        
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
  
### Serviço de Livros

O **Serviço de Livros** gerencia o catálogo de livros e a disponibilidade dos mesmos.

- **POST /livros:** Cadastrar um novo livro no catálogo.

  ```json
        # Exemplo de Requisição:
  
            {
                "titulo": "Hobbit 5",
                "autor": "J.R.R. Tolkien",
                "disponivel": true  
            }
  
        # Método: POST
  
        # Exemplo de Resposta:

        # Status 201 (Created):
    
            {
                "id": 10,
                "titulo": "Hobbit 5",
                "autor": "J.R.R. Tolkien",
                "disponivel": true,
                "updatedAt": "2024-12-06T12:31:06.799Z",
                "createdAt": "2024-12-06T12:31:06.799Z"
            }
  
- **GET /livros:** Listar todos os livros disponíveis no catálogo.
  
  ```json
        # Exemplo de Requisição:
        
            URL: http://localhost:3002/api/livros
        
        # Método: GET
        
        # Exemplo de Resposta:
        
        # Status 200 (OK):
        
            {
                "id": 1,
                "titulo": "O Senhor dos Anéis: A Sociedade do Anel",
                "autor": "J.R.R. Tolkien",
                "disponivel": false,
                "createdAt": "2024-12-05T05:40:02.100Z",
                "updatedAt": "2024-12-05T15:22:09.494Z"
            },
            {
                "id": 2,
                "titulo": "1984",
                "autor": "George Orwell",
                "disponivel": false,
                "createdAt": "2024-12-05T05:40:11.902Z",
                "updatedAt": "2024-12-05T15:25:25.955Z"
            }

    
- **GET /livros/:id:** Buscar um livro específico pelo ID.
  
  ```json
        # Exemplo de Requisição:
    
            URL: http://localhost:3002/api/livros/1
    
        # Método: GET
        
        # Exemplo de Resposta:

        # Status 200 (OK):
    
            {
                "id": 1,
                "titulo": "O Senhor dos Anéis: A Sociedade do Anel",
                "autor": "J.R.R. Tolkien",
                "disponivel": false,
                "createdAt": "2024-12-05T05:40:02.100Z",
                "updatedAt": "2024-12-05T15:22:09.494Z"
            }


- **PATCH /livros/:id:** Atualizar a disponibilidade de um livro (por exemplo, marcar como "disponível" ou "emprestado").

  ```json
        # Exemplo de Requisição:
    
            URL: http://localhost:3002/api/livros/1
            Body:
            {
                "disponivel": "false"
            }
    
        # Método: PATCH
        
        # Exemplo de Resposta:

        # Status 200 (OK):
    
            {
                "id": 10,
                "titulo": "Hobbit 5",
                "autor": "J.R.R. Tolkien",
                "disponivel": false,
                "createdAt": "2024-12-06T12:31:06.799Z",
                "updatedAt": "2024-12-06T12:37:41.484Z"
            }
    
### Serviço de Empréstimos

O **Serviço de Empréstimos** gerencia os empréstimos e devoluções de livros.

- **POST /emprestimos:** Registrar um empréstimo de um livro para um usuário. O serviço verifica se o livro está disponível e se o usuário existe.

  ```json
        # Exemplo de Requisição:
  
              { 
                "livroId": 7,
                "usuarioId": 1
              }
  
        # Método: POST
  
        # Exemplo de Resposta:

        # Status 201 (Created):
    
            {
                "dataEmprestimo": "2024-12-06T12:41:36.393Z",
                "id": 4,
                "livroId": 7,
                "usuarioId": 1,
                "status": "ativo",
                "updatedAt": "2024-12-06T12:41:36.395Z",
                "createdAt": "2024-12-06T12:41:36.395Z"
            }
  
- **GET /emprestimos:** Listar todos os empréstimos registrados.

  ```json
        # Exemplo de Requisição:
        
            URL: http://localhost:3003/api/emprestimos
        
        # Método: GET
        
        # Exemplo de Resposta:
        
        # Status 200 (OK):
        
            [
                {
                    "id": 1,
                    "livroId": 7,
                    "usuarioId": 1,
                    "dataEmprestimo": "2024-12-05T17:36:02.233Z",
                    "dataDevolucao": "2024-12-05T17:51:56.567Z",
                    "status": "devolvido",
                    "createdAt": "2024-12-05T17:36:02.236Z",
                    "updatedAt": "2024-12-05T17:51:56.569Z"
                },
                {
                    "id": 2,
                    "livroId": 8,
                    "usuarioId": 2,
                    "dataEmprestimo": "2024-12-05T18:07:03.708Z",
                    "dataDevolucao": "2024-12-05T18:07:33.887Z",
                    "status": "devolvido",
                    "createdAt": "2024-12-05T18:07:03.711Z",
                    "updatedAt": "2024-12-05T18:07:33.887Z"
                },
                {
                    "id": 3,
                    "livroId": 9,
                    "usuarioId": 1,
                    "dataEmprestimo": "2024-12-05T18:07:12.894Z",
                    "dataDevolucao": null,
                    "status": "ativo",
                    "createdAt": "2024-12-05T18:07:12.895Z",
                    "updatedAt": "2024-12-05T18:07:12.895Z"
                }
            ]



- **POST /emprestimos/:id/devolucao:** Registrar a devolução de um livro emprestado, atualizando o status do livro para "disponível".

    ```json
        # Exemplo de Requisição:
        
            URL: http://localhost:3003/api/emprestimos/3/devolucao
        
        # Método: GET
        
        # Exemplo de Resposta:
        
        # Status 200 (OK):
        
            {
                "id": 3,
                "livroId": 9,
                "usuarioId": 1,
                "dataEmprestimo": "2024-12-05T18:07:12.894Z",
                "dataDevolucao": "2024-12-06T12:44:13.728Z",
                "status": "devolvido",
                "createdAt": "2024-12-05T18:07:12.895Z",
                "updatedAt": "2024-12-06T12:44:13.728Z"
            }

       
