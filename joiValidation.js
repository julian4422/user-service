const Joi = require('joi');

function loginValidator(req, res, next) {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const options = {
        abortEarly: false, 
        allowUnknown: true, 
        stripUnknown: true 
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        res.status(400).send(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}; 

function queryValidator(req, res, next) {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        res.status(400).send(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
};

function updateValidator(req, res, next) {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    });

    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        res.status(400).send(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
};

function deleteValidator(req, res, next) {

    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    });

    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        res.status(400).send(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
};





module.exports = {
    loginValidator,
    queryValidator,
    updateValidator,
    deleteValidator,
};
