const baseResponse = require("../../helper/baseResponse/baseResponse");
const Category = require('./category.schema');
const { updateACategoryValidator, updateACategoryIdValidator } = require('./category.validator');

const updateACategory = async (req, res) => {
    try {
        const validated = updateACategoryValidator.validate(req.body);
        if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const validate_id = updateACategoryIdValidator.validate(req.params);
        if (validate_id.error) return res.status(400).json(baseResponse(400, validate_id.error.details[0].message, {}));
        const id = req.params.id;
        const { category_name, category_type, active } = req.body;
        const category_exists = await Category.exists({ category_name, category_type, active });
        if (category_exists) return res.status(400).json(baseResponse(400, "Category Already Exists", {}));
        const category = await Category.findByIdAndUpdate(id, { category_name: category_name, category_type: category_type, active:active, updated_at: Date.now() }, { new: true });
        if (!category) return res.status(404).json(baseResponse(404, "Category Not Found", {}));
        return res.status(200).json(baseResponse(200, "Category Details Updated", category));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", { error }));
    }
}

module.exports = updateACategory;
