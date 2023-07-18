const baseResponse = require('../../helper/baseResponse/baseResponse');
const Item = require('./menu-item.schema');
const {getADetailMenuItemValidator} = require('./menu-item.validator');

const getAMenuitem = async (req, res) => {
    try {
        let validated = getADetailMenuItemValidator.validate(req.params);
        if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const { id } = req.params;
        const item = await Item.findById(id).populate('category').populate('subcategory').populate('menu').populate('ingredients.inventory');
        if (!item) return res.status(404).json(baseResponse(404, "Item Not Found", {}));
        return res.status(200).json(baseResponse(200, "Item Fetched", item));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal server error", { error }));
    }
}
module.exports = getAMenuitem;