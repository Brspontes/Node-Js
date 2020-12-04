docker ps

docker exec -it 43ad673f12ad mongo -u brspontes -p minhasenhasecreta --authenticationDatabase herois

db.herois.insert({
    nome: 'flash',
    poder: 'Velocidade',
    dataNascimento: '1995-08-13'
})

for (let i = 0; i <= 500; i++) {
    db.herois.insert({
    nome: `Clone-${i}`,
    poder: 'Velocidade',
    dataNascimento: '1995-08-13'
    })
}