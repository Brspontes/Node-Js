const express = require('express')()
const bodyParser = require('body-parser')
const config = require('config')
const consign = require('consign')
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json')

express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
express.use(bodyParser.json())
express.use(bodyParser.urlencoded( {extended: true} ))

consign()
    .include('src/controllers')
    .into(express)

express.listen(config.get('api.port'), () => console.log('servidor On: Port:4000'))



