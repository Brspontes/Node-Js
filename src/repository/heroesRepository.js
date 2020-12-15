const IHeroes = require('./../domain/interfaces/IHeroes')
const connection = require('./dbContext/connection')

class HeroesRepository extends IHeroes {
    constructor() {
        super()
    }

    async add (item) {
        const query = 'INSERT INTO HEROES SET ?'

        return new Promise((resolve, reject) => {
            connection.query(query, item, (error, result) => {
                if (error)
                    reject(error)
                else
                    resolve(result)
            })
        })
    }

    async readAll () {
        const query = 'SELECT * FROM HEROES'

        return new Promise((resolve, reject) => {
            connection.query(query, (error, result) => {
                if (error)
                    reject(error)
                else
                    resolve(result)
            })
        })
    }

    async readById (item) {
        const query = 'SELECT * FROM HEROES WHERE ID = ?'

        return new Promise((resolve, reject) => {
            connection.query(query, item, (error, result) => {
                if (error)
                    reject(error)
                else
                    resolve(result)
            })
        })
    }

    async update (id, item) {
        const query = 'UPDATE HEROES SET ? WHERE id = ?'

        return new Promise((resolve, reject) => {
            connection.query(query, [ item, id ], (error, result) => {
                if (error)
                    reject(error)
                else
                    resolve(result)
            })
        })
    }

    async delete (id) {
        const query = 'DELETE FROM Heroes Where id = ?'

        return new Promise((resolve, reject) => {
            connection.query(query, id, (error, result) => {
                if (error)
                    reject(error)
                else
                    resolve(result)
            })
        })
    }
}

module.exports = new HeroesRepository()