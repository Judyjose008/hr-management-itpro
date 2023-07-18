const { string } = require('joi');
const Joi = require('joi');

const createMenuValidator = Joi.object({
    menu_name: Joi.string().required(),
    menu_type: Joi.string().required(),
    active: Joi.boolean().required()
});
const getAllMenuQueryValidator = Joi.object({
    limit: Joi.string().empty(),
    page_no: Joi.string(),
    menu_type: Joi.string().valid("DINEIN", "TAKEOUT", "PICKUP", "DELIVERY"),
    menu_name: Joi.string(),
    active: Joi.boolean()
});
const getAMenuIdValidator = Joi.object({
    id: Joi.string().required()
});
const updateAMenuValidator = Joi.object({
    menu_name: Joi.string().required(),
    menu_type: Joi.string().valid("DINEIN", "TAKEOUT", "PICKUP", "DELIVERY"),
    active: Joi.boolean().required()
});
const updateMenuIdValidator = Joi.object({
    id: Joi.string().required()
});

const deleteAMenuIdValidator = Joi.object({
    id: Joi.string().required()
});

module.exports = {
    createMenuValidator,
    getAllMenuQueryValidator,
    getAMenuIdValidator,
    updateAMenuValidator,
    updateMenuIdValidator,
    deleteAMenuIdValidator
}