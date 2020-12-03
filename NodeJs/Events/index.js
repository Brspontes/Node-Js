const EventEmitter = require('events')

class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'

/*meuEmissor.on(nomeEvento, function (click) {
    console.log('clicou', click)
})

meuEmissor.emit(nomeEvento, 'na barra rolagem')
meuEmissor.emit(nomeEvento, 'na ok')

let count = 0
setInterval(() => {
    meuEmissor.emit(nomeEvento, 'na ok ' + (count++))
}, 1000)*/

const stdin = process.openStdin()
function main () {
    return new Promise(function (resolve, reject) {
        stdin.addListener ('data', function (value) {
            //console.log(`Digitou: ${value.toString().trim()}`)
            return resolve (value)
        })
    })
}

main().then(function (resultado) {
    console.log('resultado', resultado.toString())
})