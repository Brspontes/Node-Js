const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario () {
    return new Promise (function resolvePromise (resolve, reject) {
        setTimeout(function() {
            return resolve ({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone (idUsuario) {
    return new Promise (function resolvePromise (resolve, reject) {
        setTimeout(function() {
            return resolve ({
                telefone: '981048031',
                DDD: 15
            })
        }, 2000)
    })
}

function obterEndereco (idUsuario, callbabk) {
        setTimeout(function() {
            return callbabk (null, {
                endereco: 'Juarez Ferreira',
                numero: 472
            })
        }, 2000)
}

main()
async function main () {
    try {
        const usuario = await obterUsuario ()
        const telefone = await obterTelefone (usuario.id)
        const endereco = await obterEnderecoAsync (usuario.id)

        console.log ({ usuario: usuario, telefone: telefone, endereco: endereco })
    } catch (error) {
        console.error('error', error)
    }
}


/*const usuarioPromise = obterUsuario ()
usuarioPromise
    .then (function (usuario) {
        return obterTelefone (usuario.id)
            .then (function resolverTelefone (result) {
                return {
                    usuario: usuario,
                    telefone: result
                }
            })
    })
    .then (function (resultado) {
        const endereco = obterEnderecoAsync (resultado.usuario.id)
        return endereco.then (function resolverEndereco (result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then (function (resultado){
        console.log('resultado', resultado)
    })
    .catch (function (error){
        console.error ('DEU RUIM', error)
    })
    */

/*const usuario = obterUsuario(function resolverUsuario (error, usuario) {
    if (error) {
        console.error('Error', error)
        return;
    }

    obterTelefone (usuario.id, function resolverTelefone (error1, telefone) {
        if (error1) {
            console.error('Error Telefone', error)
            return;
        }
        return telefone
    })
    
    obterEndereco (usuario.id, function (error2, endereco) {
        if (error2) {
            console.error('Error Endereco', error)
            return;
        }
        return endereco
    })

    console.log(usuario)
    console.log(telefone)
    console.log(endereco)
})*/




