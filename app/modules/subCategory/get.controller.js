const baseResponse = require("../../helper/baseResponse/baseResponse");
const Subcategory = require('./subcategory.schema');
const { getASubCategoryValidator } = require("./subcategory.validator");

const getASubCategory = async (req, res) => {
    try {
        let validated = getASubCategoryValidator.validate(req.params);
        if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const { id } = req.params;
        const subcategory = await Subcategory.findById(id).populate('category');
        if (!subcategory) return res.status(404).json(baseResponse(400, "Subcategory not found", {}));
        return res.status(200).json(baseResponse(200, "Subcategory Fetched", subcategory));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", { error }));
    }
}
module.exports = getASubCategory;