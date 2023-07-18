const baseResponse = require('../../helper/baseResponse/baseResponse');
const Inventory = require('./inventory.schema');
const { deleteInventoryIdValidator } = require('./inventory.validator');

const deleteAInventory = async(req,res) => {
    try {
        const validated = deleteInventoryIdValidator.validate(req.params);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const {id} = req.params;
        const inventory = await Inventory.findByIdAndDelete(id);
        if(!inventory) return res.status(404).json(baseResponse(404, "Inventory Item not found", {}));
        return res.status(200).json(baseResponse(200, "Inventory Item Deleted Successfully", inventory));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", {error}));
    }
}
module.exports = deleteAInventory;