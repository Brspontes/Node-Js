const errors = require('./../../utils/Errors/MessageErrors')

class NotImplementedException extends Error {
    constructor () {
        super(errors.MessageNotImplemented)
    }
}

class IHeroes {
    add (item) {
        throw new NotImplementedException()
    }

    readAll () {
        throw new NotImplementedException()
    }

    readById (item) {
        throw new NotImplementedException()
    }

    update (id, item) {
        throw new NotImplementedException()
    }

    delete (item) {
        throw new NotImplementedException()
    }
}

module.exports = IHeroes