const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (requisicao, resposta) => {
    const dadosRecebidos = requisicao.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.add()
    resposta.send(
        JSON.stringify(fornecedor)
    )
})

roteador.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregarPorId()

        resposta.send(JSON.stringify(fornecedor))
    } catch (error) {
        resposta.send(JSON.stringify({
            mensage: error.message
        }))
    }
})

roteador.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, {id: id})
        const fornecedor = new Fornecedor(dados)
        
        await fornecedor.update()
    } catch (error) {
        res.send(JSON.stringify({
            mensage: error
        }))
    }


})

module.exports = roteador