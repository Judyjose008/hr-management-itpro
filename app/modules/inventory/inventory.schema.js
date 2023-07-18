require('dotenv').config();
const mongoose = require('mongoose');

const inventory = new mongoose.Schema({
    inventory_item: { type: String, required: true, index: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true},
    vendor: {type: mongoose.Schema.Types.ObjectId, ref: 'vendor', required: true},
    sku:{ type: String, required: true, default: 0},
    unit: { type: String, enum:["GRAM","NOS" ]},
    stock: { type: Number, required: true},
    created_by: { type: String, default: "1" },
    modified_by: { type: String, default: "1" },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
});
const Inventory = mongoose.model('inventories', inventory);

module.exports = Inventory;




