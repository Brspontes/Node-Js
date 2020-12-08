const customExpress = require('./config/customExpress')()
const connection = require('./Infra/connection')
const Tables = require('./Infra/tables')

connection.connect((error) => {
    if(error)
        console.log(error)
    else
    {
        Tables.init(connection)
        console.log('Conectado')
        customExpress.listen(3000, () => console.log('Rodando porta 3000'))
    }
})
