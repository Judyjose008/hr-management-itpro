require('dotenv').config(); 
const mongoose = require('mongoose');

const menu = new mongoose.Schema({
    menu_name: {type: String, default: "1", required: true, index: true},
    active: {type: Boolean, default: true, required: true},
    menu_type: {type: String, default:'DINEIN', enum:["DINEIN","TAKEOUT","PICKUP", "DELIVERY"], required:true, index: true},
    created_by: { type: String, default: "1" },
    modified_by: { type: String, default: "1" },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
});
const Menu = mongoose.model('menu', menu);
module.exports = Menu;