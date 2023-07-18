/**
 *  inventory_item:  
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true},
    vendor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'vendor', required: true},
    sku: 
    unit:  
    stock:  
 */
const baseResponse = require('../../helper/baseResponse/baseResponse');
const Inventory =  require('./inventory.schema');
const {createInventoryValidator} = require('./inventory.validator');
const { v4: uuidv4 } = require('uuid');

const createInventory = async(req, res) => {
    try {
        let validated = createInventoryValidator.validate(req.body);
        if(validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0], {}));
        const {inventory_item, category, vendor, unit, stock} = req.body;

        const inventoryExists = await Inventory.exists({inventory_item});
        if(inventoryExists) return res.status(400).json(baseResponse(400, "Item Already exists in inventory", {}));
        const sku = uuidv4();
        const inventory = new Inventory({
            inventory_item: inventory_item,
            category: category,
            vendor: vendor,
            unit: unit,
            stock: stock,
            sku: sku
        });
        await inventory.save();
        return res.status(200).json(baseResponse(200, "Inventory Item Created", inventory));
    } catch (error) {
        res.status(500).json(baseResponse(500, "Internal Server Error", {error}));
    }
}
module.exports = createInventory;