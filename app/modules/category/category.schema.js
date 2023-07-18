require('dotenv').config();
const mongoose = require('mongoose');

const category = new mongoose.Schema({
    created_by: { type: String, default: "1" },
    modified_by: { type: String, default: "1" },
    category_name: { type: String, required: true, index: true },
    category_type: { type: String, default: 'MENU', enum: ["INVENTORY", "MENU"], required: true, index: true },
    active: {type: Boolean, default:true, required: true},
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
});
const Category = mongoose.model('categories', category);

module.exports = Category;




