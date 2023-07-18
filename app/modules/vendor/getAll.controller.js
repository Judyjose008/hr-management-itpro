const baseResponse = require('../../helper/baseResponse/baseResponse');
const Vendor = require('./vendor.schema');
const { getAllVendorQueryValidator } = require('./vendor.validator');

const getAllVendors = async (req, res) => {
    try {
        let validated = getAllVendorQueryValidator.validate(req.query);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));

        const {limit, page_no, name} = req.query;
        const pageNo = parseInt(page_no) || 1;
        const startIndex = (pageNo - 1) * 10;
        const query = {};
        if(name) query['name'] = name;
        const vendors = await Vendor.find(query).sort({ _id: -1 }).skip(startIndex).limit(parseInt(limit));
        const noOfTotalDocument = await Vendor.count();
        if (!vendors) return res.status(404).json(baseResponse(404, "Vendor Not Found", {}));
        return res.status(200).json(baseResponse(200, "Vendor Found", {vendors, no_of_total_documents : noOfTotalDocument}));
    } catch (error) {
        res.status(500).json(baseResponse(500, "Internal Server Error", { error }));
    }
}
module.exports = getAllVendors;