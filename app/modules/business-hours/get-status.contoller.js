const baseResponse = require("../../helper/baseResponse/baseResponse");
const Business_hours = require("./business-hours.schema");
const { getStatusValidator } = require("./business-hours.validator");

const getStatus = async (req, res) => {
  try {
    let validated = getStatusValidator.validate(req.query);
    if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));

    const { time, day } = req.query;
    const businessHours = await Business_hours.findOne({ active: true})
    const businessDay = businessHours.business_hours.find((business_hour) => { return business_hour.day === day});
    const open = parseInt(time) >= parseInt(businessDay.start_time.toString()) && parseInt(time) < parseInt(businessDay.end_time.toString())
    return res.status(200).json(baseResponse(200, "Business hours fetched", {open, businessDay}));
  } catch (error) {
    return res.status(500).json(baseResponse(500, 'Internal server error', {error}));
  }
};

module.exports = getStatus