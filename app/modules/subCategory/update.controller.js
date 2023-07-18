const baseResponse = require("../../helper/baseResponse/baseResponse");
const Subcategory = require('./subcategory.schema');
const { updateASubCategoryBodyValidator} = require("./subcategory.validator");

const updateASubCategory = async (req,res) => {
    try {
        let validated = updateASubCategoryBodyValidator.validate(req.body);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0], {}));
        const { id } = req.params;
        const { subcategory_name, category_id, active } = req.body;
        const subCategoryExists = await Subcategory.exists({subcategory_name, category: category_id, active});
        if(subCategoryExists) return res.status(400).json(baseResponse(400, "Subcategory Already Exists", {}));
        const subcategory = await Subcategory.findByIdAndUpdate(id, {  subcategory_name:  subcategory_name, category: category_id, updated_at: Date.now() }, {new: true}).populate("category");
        if(!subcategory) return res.status(404).json(baseResponse(404, "Category Not Found", {}));
        return res.status(200).json(baseResponse(200, "Subcategory updated", subcategory));
      } catch (error) {
        res.status(500).json(baseResponse(500, "Internal Server Error", {error}))
      }
}
module.exports = updateASubCategory