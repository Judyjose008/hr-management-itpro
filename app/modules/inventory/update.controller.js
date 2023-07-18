const baseResponse = require('../../helper/baseResponse/baseResponse');
const Inventory = require('./inventory.schema');
const { updateAInventoryBodyValidator, updateAInventoryIdValidator } = require('./inventory.validator');

const updateAInventory = async (req, res) => {
    try {
        let validated = updateAInventoryBodyValidator.validate(req.body);
        if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0], {}));
        let validate_id = updateAInventoryIdValidator.validate(req.params);
        if (validate_id.error) return res.status(400).json(baseResponse(400, validate_id.error.details[0], {}));
        const { id } = req.params;
        const { inventory_item, category, vendor, unit, stock } = req.body;
        const inventory_exists = await Inventory.exists({ inventory_item });
        if (inventory_exists) return res.status(400).json(baseResponse(400, "Inventory Item Already Exists", {}));
        const inventory = await Inventory.findByIdAndUpdate(id, {
            inventory_item: inventory_item,
            category: category,
            vendor: vendor,
            unit: unit,
            stock: stock,
            updated_at: Date.now()

        }, { new: true }).populate('category').populate('vendor');
        if (!inventory) return res.status(404).json(baseResponse(404, "Inventory Item Not Found", {}));
        return res.status(200).json(baseResponse(200, "Inventory Item Updated", inventory));
    } catch (error) {
        res.status(500).json(baseResponse(500, "Internal Server Error", { error }))
    }
}
module.exports = updateAInventory;
