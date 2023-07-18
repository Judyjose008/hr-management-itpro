const baseResponse = require("../../helper/baseResponse/baseResponse");
const Vendor = require('./vendor.schema');
const { updateVendorValidator } = require('./vendor.validator');

const updateAllVendor = async (req, res) => {
    try {
        const validated = updateVendorValidator.validate(req.body);
        if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const vendor_id = req.params.id;
        const updated_vendor = req.body;
        const vendor = await Vendor.findByIdAndUpdate(vendor_id, { updated_vendor, updated_at: Date.now() }, { new: true });
        if (!vendor) return res.status(404).json(baseResponse(404, "Vendor not Found", vendor));
        return res.status(200).json(baseResponse(200, "Vendor Details Updated", vendor));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", { error }));
    }
}
module.exports = updateAllVendor;