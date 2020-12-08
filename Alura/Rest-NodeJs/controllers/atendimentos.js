const atendimentos = require('./../models/atendimentos')
const Atendimento = require('./../models/atendimentos')

module.exports = app => {
    app.get ('/atendimentos', (req, res) => {
        Atendimento.getAll(res)
    })

    app.get ('/atendimentos/:id', (req, res) => {
        const { id } = req.params
        Atendimento.getById(parseInt(id), res)
    })

    app.post ('/atendimentos', (req, res) =>{
            const result = Atendimento.add(req.body, res)
    })

    app.patch ('/atendimentos/:id', (req, res) => {
        const { id } = req.params
        const values = req.body

        Atendimento.update(parseInt(id), values, res)
    })

    app.delete ('/atendimentos/:id', (req, res) => {
        const { id } = req.params
        Atendimento.delete(parseInt(id), res)
    }) 
}