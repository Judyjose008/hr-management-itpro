require('dotenv').config();
const mongoose = require('mongoose');
const { ENUM_ROLES } = require('./user.enum');

const user = new mongoose.Schema({
    created_by: { type: String, default: "1" },
    updated_by: { type: String, default: "1"},
    created_at: { type: Date, default: "1" },
    updated_at: { type: Date, default: "1"},
    active: { type: Boolean, default: true },
    
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true , unique: true, index: true},
    password:{ type: String, required: true},
    joining_date: { type: String, required: true },
    phone_number: { type: String, required: false, default: "NO PHONE NUMBER GIVEN" },
  
    roles: [{ type: String, required: true, default: "EMPLOYEE", enum: ENUM_ROLES}],
    project: [{ type: mongoose.Schema.Types.ObjectId, ref: 'projects', required: true}],
    timezone: { type: String, required: true},
});

const User = mongoose.model('user',user);
module.exports = User;