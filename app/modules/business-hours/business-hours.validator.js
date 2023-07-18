const Joi = require('joi'); 

const createBusinessHourValidator = Joi.object({
    business_hour_name: Joi.string().required(),
    business_hours: Joi.array().items( Joi.object({
        start_time: Joi.string().required(), 
        end_time: Joi.string().required(),
        day: Joi.string().required().valid("SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY")
    }))
});

const getStatusValidator = Joi.object({
    time: Joi.string().required(),
    day: Joi.string().required().valid("SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY")
});
module.exports = {
    createBusinessHourValidator,
    getStatusValidator
};