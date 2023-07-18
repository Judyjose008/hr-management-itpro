const baseResponse = require('../../helper/baseResponse/baseResponse');
const Item = require('./menu-item.schema');
const { deleteMenuItemValidator } = require('./menu-item.validator');

const deleteItem = async(req,res) => {
    try {
        const validated = deleteMenuItemValidator.validate(req.params);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) return res.status(404).json(baseResponse(404, "Item not found", {}));
        return res.status(200).json(baseResponse(200, "Item deleted", deletedItem));
        
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal server error", { error }));
    }
}
module.exports = deleteItem;