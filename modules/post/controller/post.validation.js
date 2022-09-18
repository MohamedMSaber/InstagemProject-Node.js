const Joi = require("joi");

const createPost = {
    body: Joi.object().required().keys({
        text: Joi.string().optional()

    })
}

const like = {
    params: Joi.object().required().keys({
        id: Joi.string().min(24).max(24).required()

    })
}

const comment = {
    body: Joi.object().required().keys({
        text: Joi.string().required()

    }),
    params: Joi.object().required().keys({
        id: Joi.string().min(24).max(24).required()

    })
}



module.exports = {createPost,like , comment};