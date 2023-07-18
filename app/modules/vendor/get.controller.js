const baseResponse = require('../../helper/baseResponse/baseResponse');
const Vendor = require('./vendor.schema');
const {getAVendorValidator} = require('./vendor.validator');

const getAVendor = async(req,res) => {
    try {
        let validated = getAVendorValidator.validate(req.params);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const {id} = req.params;
        const vendor = await Vendor.findById({_id: id});
        if(!vendor) {
            return res.status(404).json(baseResponse(404, "Vendor Not Found",{}));
        } else{
            return res.status(200).json(baseResponse(200, "Vendor Found", vendor));
        }
    } catch (error) {
        res.status(500).json(baseResponse(500, "Internal Server Error",{error}));
    }
}
module.exports = getAVendor;
