const axios = require('axios')
const Emprestimo = require('../models/emprestimo')

const registrarEmprestimo = async (data) => {
    try {
        // Log de depuração - Exibindo os dados antes de fazer as requisições
        console.log(`Buscando livro com ID: ${data.livroId}`)
        const livro = await axios.get(`http://localhost:3002/api/livros/${data.livroId}`)
        if (!livro.data) {
            throw new Error(`Livro com ID ${data.livroId} não encontrado`)
        }
        console.log(`Livro encontrado: ${livro.data}`)

        if (!livro.data.disponivel) {
            throw new Error('Livro não está disponível para empréstimo')
        }

        // Log de depuração - Exibindo a requisição para o usuário
        console.log(`Buscando usuário com ID: ${data.usuarioId}`)
        const usuario = await axios.get(`http://localhost:3001/api/usuarios/${data.usuarioId}`)
        if (!usuario.data) {
            throw new Error(`Usuário com ID ${data.usuarioId} não encontrado`)
        }
        console.log(`Usuário encontrado: ${usuario.data}`)

        // Atualizar a disponibilidade do livro
        await axios.patch(`http://localhost:3002/api/livros/${data.livroId}`, { disponivel: "false" })

        // Registrar o empréstimo
        const emprestimo = await Emprestimo.create({
            livroId: data.livroId,
            usuarioId: data.usuarioId,
            status: 'ativo'
        })
        
        console.log(`Empréstimo registrado com sucesso: ${emprestimo}`)
        return emprestimo
    } catch (erro) {
        console.error(`Erro ao registrar empréstimo: ${erro.message}`)
        throw new Error(`Erro ao registrar empréstimo: ${erro.message}`)
    }
}

const listarEmprestimos = async () => {
    return await Emprestimo.findAll()
}

const registrarDevolucao = async (id) => {
    const emprestimo = await Emprestimo.findByPk(id)

    if (!emprestimo || emprestimo.status === 'devolvido') {
        throw new Error('Empréstimo já devolvido ou não encontrado')
    }

    await axios.patch(`http://localhost:3002/api/livros/${emprestimo.livroId}`, { disponivel: "true" })

    emprestimo.status = 'devolvido'
    emprestimo.dataDevolucao = new Date()

    await emprestimo.save()

    return emprestimo
}

module.exports = { registrarEmprestimo, listarEmprestimos, registrarDevolucao }
