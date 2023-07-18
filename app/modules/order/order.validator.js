const Joi = require('joi');


const createOrderValidator = Joi.object({
    customer_name: Joi.string().required(),
    email: Joi.string().required(),
    phone_number: Joi.string().required(),
    items: Joi.array().items(
        Joi.object({
            quantity: Joi.number().required(),
            menu_item: Joi.string().required()
        })
    ),
    payment_mode: Joi.string().required(),
    delivery_address: Joi.string(),
    menu_id: Joi.string().required(),
    tax: Joi.number().required()
});
module.exports = {
    createOrderValidator
}