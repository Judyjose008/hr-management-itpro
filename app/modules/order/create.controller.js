const baseResponse = require('../../helper/baseResponse/baseResponse');
const Order = require('./order.schema');
const Item = require('../menu-items/menu-item.schema');
const Menu = require('../menu/menu.schema');
const { createOrderValidator } = require('./order.validator');
const calculateSubTotalAmount = require('../../helper/calculations/calculateSubTotalAmount');
const calculateTaxAmount = require('../../helper/calculations/calculateTaxAmount');
const calculateTotalAmount = require('../../helper/calculations/calculateTotalAmount');
const createStripeSession = require('../../helper/payment/stripe/createStripeSession');

const createOrder = async (req, res) => {
    try {
        const validated = createOrderValidator.validate(req.body);
        if (validated.error) return res.status(400).json(baseResponse(400, validated.error.details[0].message, {}));
        const { customer_name, email, phone_number, items, payment_mode, delivery_address, menu_id, tax } = req.body;


        const menu = await Menu.findById(menu_id); // hight cost
        const menuType = menu.menu_type;
        const noOfTotalDocuments = await Order.count(); //high cost
       
        let order = new Order({
            customer_name: customer_name,
            email: email,
            phone_number: phone_number,
            items: items,
            order_id: `${menuType}_${noOfTotalDocuments}`,
            order_type: menuType,
            sub_total_amount: 0,
            tax_amount: 0,
            total_amount: 0,
            payment_mode: payment_mode,
            delivery_address: delivery_address,
            created_at: Date.now()
        });

        order = await order.execPopulate("items.menu_item");
        order.sub_total_amount = calculateSubTotalAmount(order.items);
        order.tax_amount = calculateTaxAmount(order.items, tax);
        order.total_amount = calculateTotalAmount(order.items, tax);

        if(order.payment_mode == 'STRIPE') {
            const { stripe_session_id, stripe_payment_url } = await createStripeSession(order);
            order.stripe_session_id = stripe_session_id;
            order.stripe_payment_url = stripe_payment_url;
        }

        await order.save();
        return res.status(200).json(baseResponse(200, "Order Created", {order}));
    } catch (error) {
        console.log(error);
        return res.status(500).json(baseResponse(500, "Internal Server Error", { error }));
    }
}

module.exports = createOrder;