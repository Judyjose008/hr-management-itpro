const baseResponse = require("../../helper/baseResponse/baseResponse");
const Inventory = require('./inventory.schema');
const { getAInventoryValidator } = require("./inventory.validator");

const getAInventory = async(req, res) => {
    try {
        let validated = getAInventoryValidator.validate(req.params);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const {id} = req.params;
        const inventory = await Inventory.findById(id).populate('category').populate('vendor');
        if(!inventory) return res.status(404).json(baseResponse(404, "Inventory Item Not Found", {}));
        return res.status(200).json(baseResponse(200, "Inventory Item Fetched", inventory));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", {error}));
    }
}
module.exports = getAInventory;