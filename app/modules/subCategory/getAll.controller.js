const baseResponse = require("../../helper/baseResponse/baseResponse");
const Subcategory = require('./subcategory.schema');
const { getAllSubCategoryQueryValidator } = require("./subcategory.validator");

const getAllSubCategory = async (req, res) => {
    try {
        let validated = getAllSubCategoryQueryValidator.validate(req.query);
        if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const { limit, page_no, subcategory_name, active } = req.query;
        const pageNo = parseInt(page_no) || 1;
        const startIndex = (pageNo - 1) * 10;
        const query = {};
        console.log(query);
        if(active === 'false') query['active'] = false;
        if(active === 'true') query['active'] = true;
        if (subcategory_name) query['subcategory_name'] = subcategory_name;
        const subcategories = await Subcategory.find(query).sort({ _id: -1 }).skip(startIndex).limit(parseInt(limit)).populate('category');
        const noOfTotalDocument = await Subcategory.count();
        if (subcategories.length === 0) return res.status(404).json(baseResponse(404, "No subcategory found", {}));
        return res.status(200).json(baseResponse(200, "subcategories found", { subcategories, no_of_total_documents: noOfTotalDocument }));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", { error }));
    }
}

module.exports = getAllSubCategory;