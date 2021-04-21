const Joi = require('joi');

function loginSchema(req, res, next) {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().password().required()
    });

    const options = {
        abortEarly: false, 
        allowUnknown: true, 
        stripUnknown: true 
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
};

