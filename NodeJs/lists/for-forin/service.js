const axios = require('axios')
const URL = `https://pokeapi.co/api/v2/pokemon/`

async function obterPessoas (nome) {
    const url = `${URL}/${nome}`
    const response = await axios.get(url)
    return response.data
}

obterPessoas(nome)
    .then(function (resultado) {
        console.log('resultado', resultado)
    })
    .catch(function (error) {
        console.error('Deu Ruim', error)
    })

module.exports = { obterPessoas }