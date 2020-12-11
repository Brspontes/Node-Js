const IHeroes = require('./../domain/interfaces/IHeroes')
const HeroesRepository = require('./../repository/heroesRepository')

class HeroesModel extends IHeroes {

    constructor () { super() }

    async add (item) {
        return await HeroesRepository.add(item)
    }

    async readAll () {
        return await HeroesRepository.readAll()
    }
}

module.exports = new HeroesModel()