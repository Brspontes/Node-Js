const HeroesModel = require('./../models/heroesModel')
const StatusCode = require('./../utils/ConstMessages/statusCode')
const Messages = require('./../utils/ConstMessages/messages')

module.exports = app => {
    
    app.post('/heroes', async (req, res) => {
        const heroes = req.body
        await HeroesModel.add(heroes)
            .then(HeroesAdded => {
                const { insertId } = HeroesAdded
                res.status(StatusCode.Created).json(
                    { 
                        id: insertId, 
                        ...heroes,  
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