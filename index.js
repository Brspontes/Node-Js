const express = require('express')()
const bodyParser = require('body-parser')
const config = require('config')
const consign = require('consign')

express.use(bodyParser.json())
express.use(bodyParser.urlencoded( {extended: true} ))

consign()
    .include('src/controllers')
    .into(express)

express.listen(config.get('api.port'), () => console.log('servidor On: Port:4000'))



