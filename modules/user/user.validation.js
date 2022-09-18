const Joi = require('joi')




const profile = {
    headers : Joi.object().required().keys({
        authorization : Joi.string().required()
    }).options({allowUnknown:true})
}

module.exports = {profile}