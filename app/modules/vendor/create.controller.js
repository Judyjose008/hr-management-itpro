const baseResponse = require('../../helper/baseResponse/baseResponse');
const Vendor = require('./vendor.schema');
const { createVendorValidator } = require('./vendor.validator');

const createVendor = async(req,res) => {
    try {
        let validated = createVendorValidator.validate(req.body);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const {name, email, phone_number} = req.body;
        const vendor = new Vendor({
            name: name,
            email: email,
            phone_number: phone_number
        });
        await vendor.save();
        return res.status(200).json(baseResponse(200, "Vendor Created", vendor));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", {error}));
    }
}
module.exports = createVendor;