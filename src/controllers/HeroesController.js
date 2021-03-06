require('dotenv').config()
const HeroesModel = require('./../models/heroesModel')
const StatusCode = require('./../utils/ConstMessages/statusCode')
const Messages = require('./../utils/ConstMessages/messages')
const Schema = require('./../schemas/hero.schema')

module.exports = app => {
    
    app.post('/heroes', async (req, res) => {
        const heroes = req.body
        const { error } = Schema.validate(heroes, { abortEarly: false })
        
        if (error)
            return res.status(StatusCode.BadRequest).json({ message: 'Valores inrvalidos', error })

        //TODO: Adicionar pasta publica do mega para download
        await HeroesModel.add(heroes)
            .then(HeroesAdded => {
                const { insertId } = HeroesAdded
                return res.status(StatusCode.Created).json(
                    { 
                        id: insertId, 
                        ...heroes,
                        caminhoimagem: `${}`,  
                        message: Messages.SuccessCreated 
                    })
            })
            .catch(errors => res.status(StatusCode.InternalServerError).json(errors))
    }),

    app.get('/heroes', async (req, res) => {
        await HeroesModel.readAll()
            .then(Heroes => {
                res.status(StatusCode.Ok).json(Heroes)
            })
            .catch(errors => res.status(StatusCode.InternalServerError).json(errors))
    })

    app.get('/heroes/:id', async (req, res) => {
        const { id } = req.params

        await HeroesModel.readById(id)
            .then(Heroes => {
                res.status(StatusCode.Ok).json(Heroes[0])
            })
            .catch(errors => res.status(StatusCode.InternalServerError).json(errors))
    })

    app.put('/heroes/:id', async (req, res) => {
        const { id } = req.params
        const hero = req.body

        const { error } = Schema.validate(hero, { abortEarly: false })
        if (error)
            res.status(StatusCode.BadRequest).json({ message: 'Valores inrvalidos', error })

        await HeroesModel.update(id, hero)
            .then(Heroes => {
                res.status(StatusCode.Ok).json(
                    { 
                        id: id, 
                        ...hero,
                        message: Messages.SuccessUpdated
                    })
            })
            .catch(errors => res.status(StatusCode.InternalServerError).json(errors))
    })

    app.delete('/heroes/:id', async (req, res) => {
        const { id } = req.params

        await HeroesModel.delete(id)
            .then(Heroes => {
                res.status(StatusCode.Ok).json(Messages.SuccessDeleted)
            })
            .catch(errors => res.status(StatusCode.InternalServerError).json(errors))
    })
}