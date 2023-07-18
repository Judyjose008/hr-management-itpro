require('dotenv').config();
const mongoose = require('mongoose');

const item = new mongoose.Schema({
    item_name: {type: String, default: "1", required: true, index: true, unique: true},
    price: { type: Number, default: 0.0, required: true},
    active: {type: Boolean, default: true, required: true},
    menu: { type: mongoose.Schema.Types.ObjectId, ref: 'menu', required: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true},
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategories', required: true},
    ingredients: [{
        inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'inventories', required: true},
        quantity: {type: Number, default: 0, required: true}
    }],
    non_veg:{type: Boolean, default: true, required:true},
    images: [{ type: String }],
    created_by: { type: String, default: "1" },
    modified_by: { type: String, default: "1" },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
});

const Item = mongoose.model('item', item);
module.exports = Item;