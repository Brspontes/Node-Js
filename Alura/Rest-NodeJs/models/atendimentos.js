const moment = require('moment')
const connection = require('./../Infra/connection')

class Atendimento {
    add (atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const sql = `INSERT INTO Atendimentos SET ?`
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Nome do cliente invalido'
            }
        ]

        const errors = validacoes.filter(campo => !campo.valido)
        const existemErrors = errors.length

        if (existemErrors) {
            res.status(400).json(errors)
        }
        else {
            connection.query(sql, { ...atendimento, dataCriacao, data }, (error, result) => {
                if(error)
                    res.status(400).json(error)
                else
                    res.status(201).json(result)
            })
        }
    }

    getAll (res) {
        const sql = `select * from atendimentos`
        connection.query(sql, (error, result) => {
            if (error) res.status(400).json(error)
            else res.status(200).json(result)
        })
    }

    getById (id, res) {
        const sql = `select * from atendimentos where id = ?`
        connection.query(sql, id, (error, result) => {
            if (error) res.status(400).json(error)
            else res.status(200).json(result[0])
        })
    }

    update (id, atendimentos, res) {
        const sql = 'UPDATE atendimentos SET ? WHERE id = ?'

        if (atendimentos.data) {
            atendimentos.data = moment(atendimentos.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        connection.query (sql, [atendimentos, id], (error, result) => {
            if (error) res.status(400).json(error)
            else res.status(200).json(result)
        })
    }

    delete (id, res) {
        const sql = 'delete from atendimentos where id = ?'
        connection.query (sql, id, (error, result) => {
            if (error) res.status(400).json(error)
            else res.status(200).json({
                mensagem: 'Deletado com sucesso',
                idRemovido: id
            })
        })
    }
}

module.exports = new Atendimento