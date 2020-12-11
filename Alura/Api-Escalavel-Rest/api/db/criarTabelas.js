const ModeloTabelas = require('./../routes/fornecedores/modeloTabelaFornecedor')

ModeloTabelas
    .sync()
    .then(() => console.log('Tabela criada'))
    .catch(console.log)