const baseResponse = require('../../helper/baseResponse/baseResponse');
const Category = require('./category.schema');
const { getAllCategoryQueryValidator } = require('./category.validator');

const getAllCategory = async(req,res) => {
    try {
        let validated = getAllCategoryQueryValidator.validate(req.query);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message,{}));

        const { limit, page_no, category_type, category_name,active } = req.query;
        const pageNo  = parseInt(page_no) || 1;
        const startIndex = (pageNo-1) * 10;
        const query = {};
        if(category_type) query['category_type'] = category_type;
        if(category_name) query['category_name'] = category_name;
        if(active === 'false') query['active'] = false;
        if(active === 'true') query['active'] = true;
        const categories = await Category.find(query).sort({_id: -1}).skip(startIndex).limit(parseInt(limit));
        const noOfTotalDocument = await Category.count();
        if(categories.length === 0) return res.status(404).json(baseResponse(404, "No Category found", {}));
        return res.status(200).json(baseResponse(200,"Category Fetched", {categories, no_of_total_documents: noOfTotalDocument}));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", {error}));   
    }
}
module.exports = getAllCategory;