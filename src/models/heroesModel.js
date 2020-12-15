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

    async readById (id) {
        return await HeroesRepository.readById(id)
    }

    async update (id, item) {
        return await HeroesRepository.update(id, item)
    }

    async delete (id) {
        return await HeroesRepository.delete(id)
    }
}

module.exports = new HeroesModel()