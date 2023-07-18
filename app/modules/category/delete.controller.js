const baseResponse = require("../../helper/baseResponse/baseResponse");
const Category = require("./category.schema");
const { deleteACategoryValidator } = require("./category.validator");

const deleteACategory = async (req, res) => {
    try {
        const validated = deleteACategoryValidator.validate(req.params);
        if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));

        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) return res.status(404).json(baseResponse(404, 'Category Not Found', {}));
        return res.status(200).json(baseResponse(200, 'Category Found and Deleted Successfully', category));

    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", { error }));
    }
}
module.exports = deleteACategory;
