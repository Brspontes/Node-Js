const Joi = require('joi')

module.exports = Joi.object({
    identidade_secreta: Joi.string().required(),
    nome_heroi: Joi.string().required(),
    poder: Joi.string().required(),
    caminhoimagem: Joi.string().required()
})