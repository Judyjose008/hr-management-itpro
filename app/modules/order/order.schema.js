require('dotenv').config();
const mongoose = require('mongoose');

const order = new mongoose.Schema({
    customer_name: { type: String, required: true, index: true, default: "CUSTOMER_NAME_NOT_AVAILABLE", index:true},
    email: { type: String, required: true, index: true, default: "EMAIL_NOT_AVAILABLE", index: true},
    phone_number: { type: String, required: true, default: "PHONE_NUMBER_NOT_AVAILABLE", index: true},
    items: [
        {
            quantity: { type: Number, required: true },
            menu_item: { type: mongoose.Schema.Types.ObjectId, ref: 'item', required: true },
        }
    ],
    order_id: { type: String, required: true, default: "ORDER_ID_NOT_AVAILABLE", index: true },
    order_type: {type: String, default:'DINEIN', enum:["DINEIN","TAKEOUT","PICKUP", "DELIVERY"], required:true, index: true},
    sub_total_amount: { type: Number, required: true, default: 0 },
    tax_amount: { type: Number, required: true, default: 0 },
    total_amount: { type: Number, required: true, default: 0 },
    status: { type: String, default: 'NEW', enum: ['NEW', 'PREPARING', 'READY', 'PICKED', 'DELIVERED'], required: true },
    stripe_session_id: { type: String, required: true, default: 'STRIPE_SESSION_ID_NOT_AVAILABLE', index: true },
    stripe_payment_url: { type: String, required: true, default: 'STRIPE_PAYMENT_URL_NOT_AVAILABLE' },
    payment_completed: { type: Boolean, default: false, required: true },
    delivery_address: { type: String, default: "DELIVERY_ADDRESS_NOT_AVAILABLE" },
    payment_mode: { type: String, enum: ['CASH', 'STRIPE', 'CREDIT'], default: 'CASH', required: true },
    active: { type: Boolean, default: true },
    created_by: { type: String, default: "1" },
    modified_by: { type: String, default: "1" },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
});

const Order = mongoose.model('order', order);
module.exports = Order; 