require('dotenv').config();
const mongoose = require('mongoose');

const vendor = new mongoose.Schema({
    created_by: { type: String, default: "1" },
    modified_by: { type: String, default: "1"},
    name: { type: String, required: true},
    phone_number: { type: String, required: true, unique: true},
    email: { type: String, required:true, unique:true, index: true},
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now()},
});
// Create unique indexes on email and phone_number fields
vendor.index({ email: 1 }, { unique: true });
vendor.index({ phone_number: 1 }, { unique: true });
const Vendor = mongoose.model('vendor',vendor);
module.exports = Vendor;