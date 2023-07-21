const Joi = require('joi');
const { ENUM_ROLES } = require('./user.enum');

const createUserValidator = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_number: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    roles: Joi.array().items(Joi.string().valid(...ENUM_ROLES)),
    joining_date: Joi.string().required(),
    timezone: Joi.string().required()
});

const getAUserValidator = Joi.object({
    id: Joi.string().required()
});

const loginValidator = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

const updateUserValidator = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_number: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
});

const updateUserIdValidator = Joi.object({
    id: Joi.string().required()
});

module.exports = {
    createUserValidator,
    getAUserValidator,
    loginValidator,
    updateUserValidator,
    updateUserIdValidator
}