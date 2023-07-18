const baseResponse = require("../../helper/baseResponse/baseResponse");
const Subcategory = require('./subcategory.schema');
const { createSubCategoryValidator } = require("./subcategory.validator");

const createSubCategory = async (req,res) => {
    try {
        let validated = createSubCategoryValidator.validate(req.body);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0], {}));
        const { subcategory_name, category_id, active } = req.body;
        const subCategoryExists = await Subcategory.exists({subcategory_name, category_id, active});
        if(subCategoryExists) return res.status(400).json(baseResponse(400, "Subcategory Already Exists", {}));
        const subcategory = new Subcategory({
          subcategory_name,
          category: category_id,
          active: active 
        });
        await subcategory.save();
        return res.status(200).json(baseResponse(200, "Subcategory Created", subcategory));
      } catch (error) {
        res.status(500).json(baseResponse(500, "Internal Server Error", {error}))
      }
}
module.exports = createSubCategory


