const service = require('./service')

async function main () {
    try {
        const result = await service.obterPessoas('pikachu')
        
        for (let index = 0; index < result.results.length; index++) {
            const element = array[index];
            
        }
    } catch (error) {
        console.error(error)
    }
}

main ()