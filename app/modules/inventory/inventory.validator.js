const Joi = require('joi');

const createInventoryValidator  = Joi.object({
    inventory_item : Joi.string().required(),
    category: Joi.string().required(),
    vendor: Joi.string().required(),
    unit: Joi.string().required(),
    stock: Joi.string().required(), 
});

const getAllInventoryQueryValidator = Joi.object({
    limit: Joi.string().empty(),
    page_no: Joi.string(),
    inventory_item: Joi.string()
});
const getAInventoryValidator =  Joi.object({
    id: Joi.string().required()
});
const updateAInventoryBodyValidator = Joi.object({
    inventory_item: Joi.string().required(),
    unit: Joi.string().required(),
    stock: Joi.string().required(),
    category: Joi.string(),
    vendor: Joi.string()
});
const updateAInventoryIdValidator = Joi.object({
    id:Joi.string().required()
});
const deleteInventoryIdValidator = Joi.object({
    id: Joi.string().required()
})

module.exports = {
    createInventoryValidator,
    getAllInventoryQueryValidator,
    getAInventoryValidator,
    updateAInventoryBodyValidator,
    updateAInventoryIdValidator,
    deleteInventoryIdValidator
};