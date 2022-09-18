const Joi = require('joi')

const signUp = {
    body: Joi.object().required().keys({
        userName:Joi.string().required(),
        email:Joi.string().required().email(),
        password:Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        cPassword:Joi.string().valid(Joi.ref('password')).required(),
        age:Joi.number().min(18).required(),
        gender:Joi.string().required()


    })
}

const confirmEmail = {
    params: Joi.object().required().keys({
        token:Joi.string().required()
    })
}


const login = {
    body: Joi.object().required().keys({
        email:Joi.string().required().email(),
        password:Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
        })

    }


module.exports = {
    signUp,
    confirmEmail,
    login
}