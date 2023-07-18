const baseResponse = require('../../helper/baseResponse/baseResponse');
const Vendor = require('./vendor.schema');
const { deleteAVendorValidator } = require('./vendor.validator');

const deleteAVendor = async (req, res) => {
    try {
        const id = req.params.id;
        const validated = deleteAVendorValidator.validate( {id} );
        if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message,{}));
        const vendor = await Vendor.findByIdAndDelete({_id: id});
        if (!vendor) return res.status(404).json(baseResponse(404, 'Vendor Not Found',{}));
        return res.status(200).json(baseResponse(200, 'Vendor Found and Deleted Successfully', vendor));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", { error }));
    }
}

module.exports = deleteAVendor;