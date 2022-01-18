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
    try {
        const schema = Joi.object({
            title: Joi.string().required(),
            start_hour: Joi.string().required(),
            end_hour: Joi.string().required(),
            week_day: Joi.string().required(),
        }).options({ stripUnknown: true })
        return schema.validate(data)
    } catch(err) {
        return {error: err}
    }
}

export{
    registerValidation,
    loginValidation,
    scheduleValidatiom
}