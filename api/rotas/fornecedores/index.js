const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.send(
        JSON.stringify(resultados)
    )
})
roteador.post('/', async (req, res) => {
    try {
        const dadosRecebidos = req.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.send(
            JSON.stringify(fornecedor)
        ) 
    } catch(erro) {
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})
roteador.get('/:idFornecedor', async (req, res) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        res.send(
            JSON.stringify(fornecedor)
        )
    } catch(erro) {
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})
roteador.put('/:idFornecedor', async (req, res) => {
    try {
        const id = req.params.idFornecedor
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, {id: id})
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.end()
    } catch(erro) {
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})
roteador.delete('/:idFornecedor', async (req, res) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        await fornecedor.remover()
        res.end()
    } catch(erro) {
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})
module.exports = roteador