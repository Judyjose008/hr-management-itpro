const baseResponse = require("../../helper/baseResponse/baseResponse");
const Inventory = require("./inventory.schema");
const { getAllInventoryQueryValidator } = require('./inventory.validator');

const getAllInventory = async (req, res) => {
    try {
        let validated = getAllInventoryQueryValidator.validate(req.query);
        if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));

        const { limit, page_no, inventory_item } = req.query;
        const pageNo = parseInt(page_no) || 1;
        const startIndex = (pageNo - 1) * 10;
        const query = {};
        if (inventory_item) query['inventory_item'] = inventory_item;
        const inventories = await Inventory
            .find(query)
            .sort({ _id: 1 })
            .skip(startIndex)
            .limit(parseInt(limit))
            .populate('category')
            .populate('vendor');
            
        const noOfTotalDocument = await Inventory.count();
        if (inventories.length === 0) return res.status(404).json(baseResponse(404, "Inventory Item Not Found", {}));
        return res.status(200).json(baseResponse(200, "Inventory Items Fetched", { inventories , no_of_total_documents: noOfTotalDocument }));
    } catch (error) {
        return res.status(500).json(baseResponse(500, "Internal Server Error", { error }));
    }
}

module.exports = getAllInventory;


