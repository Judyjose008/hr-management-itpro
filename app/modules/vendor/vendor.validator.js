const Joi = require('joi');

const createVendorValidator = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    phone_number:Joi.string().required()
});

const getAVendorValidator = Joi.object({
    id: Joi.string().required()
});

const updateVendorValidator = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    phone_number:Joi.string().required()
})

const deleteAVendorValidator = Joi.object({
    id: Joi.string().required()
});

const getAllVendorQueryValidator = Joi.object({
    limit: Joi.string().empty(),
    page_no: Joi.string(),
    name: Joi.string()
});



module.exports = {
    createVendorValidator,
    getAVendorValidator,
    updateVendorValidator,
    deleteAVendorValidator,
    getAllVendorQueryValidator
}