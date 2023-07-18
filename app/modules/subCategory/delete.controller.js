const baseResponse = require('../../helper/baseResponse/baseResponse');
const Subcategory = require('./subcategory.schema');
const { deleteSubCategoryIdValidator } = require('./subcategory.validator');

const deleteASubCategory = async(req,res) => {
    try {
        const validated = deleteSubCategoryIdValidator.validate(req.params);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));

        const {id} = req.params;
        const subcategory = await Subcategory.findByIdAndDelete(id);
        if(!subcategory) return res.status(404).json(baseResponse(404,"Subcategory not found", {}));
        return res.status(200).json(baseResponse(200, "Subcategory Found and Deleted Successfully", subcategory));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", {error}));
    }

}
module.exports = deleteASubCategory