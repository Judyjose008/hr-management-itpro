const baseResponse = require("../../helper/baseResponse/baseResponse");
const Category = require('./category.schema');
const { createCategoryValidator } = require('./category.validator');

const createCategory = async (req, res) => {
    try {
        let validated = createCategoryValidator.validate(req.body);
        if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const { category_name, category_type,active } = req.body;
        const category_exists = await Category.exists({ category_name, category_type });
        if (category_exists) return res.status(400).json(baseResponse(400, "Category Already Exists", {}));
        const category = new Category({
            category_name: category_name,
            category_type: category_type,
            active: active
        });
        await category.save();
        return res.status(200).json(baseResponse(200, "Category Created", category));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", { error }));
    }
}

module.exports = createCategory;