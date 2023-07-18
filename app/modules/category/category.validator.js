const Joi = require('joi');

const createCategoryValidator = Joi.object({
    category_name: Joi.string().required(),
    category_type: Joi.string().required(),
    active: Joi.boolean().required(),
});

const getACategoryValidator = Joi.object({
    id: Joi.string().required()
});

const deleteACategoryValidator = Joi.object({
    id: Joi.string().required()
});

const updateACategoryValidator = Joi.object({
    category_name: Joi.string().required(),
    category_type: Joi.string().required(),
    active: Joi.boolean().required(),
});

const updateACategoryIdValidator = Joi.object({
    id: Joi.string().required()
});

const getAllCategoryQueryValidator = Joi.object({
    limit: Joi.string().empty(),
    page_no: Joi.string(),
    category_type: Joi.string().valid("INVENTORY", "MENU"),
    category_name: Joi.string(),
    active: Joi.boolean()
});

module.exports = {
    createCategoryValidator,
    getACategoryValidator,
    deleteACategoryValidator,
    updateACategoryValidator,
    updateACategoryIdValidator,
    getAllCategoryQueryValidator
}