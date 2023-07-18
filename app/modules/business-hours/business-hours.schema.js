require('dotenv').config();
const mongoose = require('mongoose');

const business_hours = new mongoose.Schema({
    created_at : { type: Date, required: true, default: Date.now()},
    created_by: { type: String, required: true, default: "1"},
    updated_at: { type: Date, required: true, default: Date.now()},
    business_hour_name: {type:String, required: true, default:'default-business-hours', unique: true},
    business_hours: [{ 
        start_time: {type: String, default: "00:01"}, 
        end_time: {type: String, default: "11:59"},
        day: { type: String, default: "SUNDAY", enum: ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]} 
    }],
    active: { type: Boolean, default: true}
});

const Business_hours = mongoose.model('Business_hours', business_hours);
module.exports = Business_hours;