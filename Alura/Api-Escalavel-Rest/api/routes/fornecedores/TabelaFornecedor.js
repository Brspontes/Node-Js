const Modelo = require('./modeloTabelaFornecedor')

module.exports = {
    listar () {
        return Modelo.findAll()
    },
    add (fornecedor) {
        return Modelo.create(fornecedor)
    },
    listarPorId (id) {
        const encontrado = await Modelo.findOne({where: {id: id}})

        if(!encontrado) {
            throw new Error('Fornecedor não encontrado')
        }

        return encontrado
    },
    update (id, dados) {
        return Modelo.update (dados, {where: {id: id}})
    }
}