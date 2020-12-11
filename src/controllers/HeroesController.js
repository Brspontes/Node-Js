const HeroesModel = require('./../models/heroesModel')

module.exports = app => {
    
    app.post('/heroes', async (req, res) => {
        const heroes = req.body
        await HeroesModel.add(heroes)
            .then(HeroesAdded => {
                const { insertId } = HeroesAdded
                res.status(201).json({ ...heroes, insertId })
            })
            .catch(errors => res.status(500).json(errors))
    }),

    app.get('/heroes', async (req, res) => {
        await HeroesModel.readAll()
            .then(Heroes => {
                res.status(200).json(Heroes)
            })
            .catch(errors => res.status(500).json(errors))
    })
}