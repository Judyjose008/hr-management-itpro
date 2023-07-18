require('dotenv').config();
const mongoose = require('mongoose');

const subCategory = new mongoose.Schema({
    subcategory_name: { type: String, required: true, index: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true },
    active: { type: Boolean, default: true, required: true },
    created_by: { type: String, default: "1" },
    modified_by: { type: String, default: "1" },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
});
const Subcategory = mongoose.model('subcategories', subCategory);

module.exports = Subcategory;