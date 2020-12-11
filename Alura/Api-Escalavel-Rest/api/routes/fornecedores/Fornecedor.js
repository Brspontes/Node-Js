const TabelaFornecedor = require('./TabelaFornecedor')

class Fornecedor {
    constructor ({id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao}) {
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async add () {
        const result = await TabelaFornecedor.add({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })

        this.id = result.id
        this.dataCriacao = result.dataCriacao
        this.dataAtualizacao = result.dataAtualizacao
        this.versao = result.versao
    }

    async carregarPorId () {
        const fornecedorEncontrado = await TabelaFornecedor.getById(this.id)
        this.empresa = fornecedorEncontrado.empresa
        this.email = fornecedorEncontrado.email
        this.categoria = fornecedorEncontrado.categoria
        this.dataCriacao = fornecedorEncontrado.dataCriacao
        this.dataAtualizacao = fornecedorEncontrado.dataAtualizacao
        this.versao = fornecedorEncontrado.versao
    }

    async update () {
        const retorno = await TabelaFornecedor.listarPorId(this.id)
        const campos = ['empresa', 'email', 'categoria']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]

            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        }) 

        if (Object.keys(dadosParaAtualizar).length === 0)
            throw new Error ('Nao foram fornecidos dados para realizar o update')

        if(!retorno) {
            throw new Error ('Nao foi encontrado valor para atualizar')
        }

        TabelaFornecedor.update(this.id, dadosParaAtualizar)
    }
}

module.exports = Fornecedor