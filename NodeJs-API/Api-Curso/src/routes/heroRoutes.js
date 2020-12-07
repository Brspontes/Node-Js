const BaseRoute = require('./baseRoute/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

class HeroRoutes extends BaseRoute {
    constructor (db) {
        super()
        this.db = db
    }

    list () {
        return {
            path: '/herois',
            method: '/GET',
            config: {
                validate: {
                    failAction: (request, headers, error) => {
                        throw error
                    },
                    query: {
                        skip: Joi.number().integer().default(0),
                        limite: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query
                    const query = nome ? { nome : {$regex: `.*${nome}*.`} } : {}

                    return this.db.read(query, skip, limit)
                } catch (error) {
                    console.log(error)
                    return "Erro interno do servidor"
                }                
            }
        }
    }

    create () {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                validate: {
                    failAction: (request, headers, error) => {
                        throw error
                    },
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    },
                    handler: async (request) => {
                        try {
                            const { nome, poder } = request.payload
                            const result = await this.db.create({nome, poder})
                            return {
                                message: 'Heroi cadastrado com sucesso'
                            }
                        } catch (error) {
                            console.log(error)
                            return
                        }
                    }
                }
            }
        }
    }

    update () {
        return {
            path: '/herois/{id}', 
            method: 'PATCH',
            config: {
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    }
                },
                handler: (request) => {
                    try {
                        const {id} = request.params;
                        const {payload} = request.payload

                        const dadosString = JSON.stringify(payload)
                        const dados = JSON.parse(dadosString)

                        const result = await this.db.update(id, dados)

                        if(result.nModified !== 1) return {
                            message: 'Não foi possível atualizar!'
                        }

                        return {
                            Message: 'Heroi atualizado com sucesso'
                        }

                    } catch (error) {
                        console.log(error)
                        return
                    }
                }
            }
        }
    }

    delete () {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                validate: {
                    failAction: (request, headers, error) => {
                        throw error
                    },
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const {id} = request.params
                    const resultado = await this.db.delete(id)

                    if (resultado !== 1) return 'Não foi possivel remover'

                    return {
                        message: 'Heroi removido'
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
}

module.exports = HeroRoutes