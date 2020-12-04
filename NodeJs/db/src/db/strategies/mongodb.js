const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')
class MongoDB extends ICrud {
    constructor () { 
        super() 
        this._herois = null
        this._driver = null
    }

    async isConnected () {
        const state = this._driver.readyState
        if (state === 1) return true
        if (state !== 2) return state

        await new Promise(resolve => setTimeout(resolve, 1000))
        
        return state
    }

    connect () {
        Mongoose.connect('mongodb://brspontes:minhasenhasecreta@localhost:27017/herois', { useNewUrlParser: true }, function (error) {
            if (error) {
                console.log(error)
            }
        })
        
        const connection = Mongoose.connection
        connection.once('open', () => console.log('Conexao Ok'))
        this._driver = connection
        this.defineModel()
    }

    defineModel () {
        const heroiSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true,
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })
        
        this._herois = Mongoose.model('herois', heroiSchema)
    }

    create (item) {
        return this._herois.create(item)
    }
    read (item, skip = 0, limit = 10) {
        return this._herois.find(item).skip(skip).limit(limit)
    }

    update (id, item) {
        return this._herois.updateOne({_id: id}, {$set: item })
    }


}


module.exports = MongoDB