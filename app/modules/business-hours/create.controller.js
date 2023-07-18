const baseResponse = require("../../helper/baseResponse/baseResponse");
const Business_hours = require("./business-hours.schema");
const { createBusinessHourValidator } = require("./business-hours.validator");


const createBusinessHours = async (req, res) => {
  try {
    let validated = createBusinessHourValidator.validate(req.body);
    if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));

    const { business_hour_name, business_hours} = req.body;
    const businessHours = new Business_hours({
      business_hour_name: business_hour_name,
      business_hours: business_hours
    });
    await businessHours.save();
    return res.status(200).json(baseResponse(200, "business hours created", businessHours));
  } catch (error) {
    return res.status(500).json(baseResponse(500, 'Internal server error', {error}));
  }
};

module.exports = createBusinessHours;