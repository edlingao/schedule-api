import Joi from '@hapi/joi'

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(5)
            .required(),
    })
    return schema.validate(data)
}

const loginValidation =  data => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(5)
            .required(),
    })
    return schema.validate(data)
}

const scheduleValidatiom = data => {
    const schema = Joi.object({
        title: Joi.string()
            .required(),
        start_hour: Joi.string(),
        end_hour: Joi.string(),
        week_day: Joi.string(),
    }).options({ stripUnknown: true })
    return schema.validate(data)
}

export{
    registerValidation,
    loginValidation,
    scheduleValidatiom
}