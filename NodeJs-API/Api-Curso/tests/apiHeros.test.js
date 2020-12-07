const assert = require('assert')
const api = require('./../src/api')
let app = {}

describe('Suite de testes API', function () {
    this.beforeAll(async () => {
        app = await api
    })
    it('Listar Herois /herois', async function () {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepStrictEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })
})