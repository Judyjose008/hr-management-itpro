const baseResponse = require("../../helper/baseResponse/baseResponse");
const Category = require("./category.schema");
const {getACategoryValidator} = require("./category.validator");

const getACategory = async(req,res) => {
    try {
        let validated = getACategoryValidator.validate(req.params);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message,{}));
        const {id} = req.params;
        const category = await Category.findById(id);
        if(!category) return res.status(404).json(baseResponse(404, "Category Not Found", {}));
        return res.status(200).json(baseResponse(200, "Category Fetched", category));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", {error}));
        
    }
}

module.exports =  getACategory;
