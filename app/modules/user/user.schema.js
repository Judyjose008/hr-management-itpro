require('dotenv').config();
const mongoose = require('mongoose');

const user = new mongoose.Schema({
    created_by: { type: String, default: "1" },
    modified_by: { type: String, default: "1"},
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true , unique: true, index: true},
    phone_number: { type: String, required: true },
    password:{ type: String, required: true},
    role: [{ type: String, required: true, default: "EMPLOYEE", enum: ["SUPER_ADMIN", "MANAGER", "EMPLOYEE", "HR"]}],
    active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now()},
});

const User = mongoose.model('user',user);
module.exports = User;