const baseResponse = require("../../helper/baseResponse/baseResponse");
const Business_hours = require("./business-hours.schema");

const getBusinessHours = async (req, res) => {
  try {
    const businessHours = await Business_hours.findOne({ active: true})
    return res.status(200).json(baseResponse(200, "Business hours fetched", businessHours));
  } catch (error) {
    return res.status(500).json(baseResponse(500, 'Internal server error', {error}));
  }
};

module.exports = getBusinessHours;