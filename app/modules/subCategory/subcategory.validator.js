const Joi = require('joi');

const createSubCategoryValidator = Joi.object({
    subcategory_name: Joi.string().required(),
    category_id: Joi.string().required(),
    active: Joi.boolean().required()
});

const getASubCategoryValidator = Joi.object({
    id:Joi.string().required()
});

const updateASubCategoryBodyValidator = Joi.object({
    subcategory_name: Joi.string().required(),
    category_id: Joi.string().required(),
    active: Joi.boolean().required()
});
const getAllSubCategoryQueryValidator = Joi.object({
    limit: Joi.string().empty(),
    page_no: Joi.string(),
    subcategory_name: Joi.string(),
    active: Joi.boolean()
});
const deleteSubCategoryIdValidator = Joi.object({
    id: Joi.string().required()
});

module.exports = {
    createSubCategoryValidator,
    getASubCategoryValidator,
    updateASubCategoryBodyValidator,
    getAllSubCategoryQueryValidator,
    deleteSubCategoryIdValidator
}