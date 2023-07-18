const calculateTotalAmount = require('../../calculations/calculateTotalAmount');

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createStripeSession = async (order) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items:  [{
                price_data:{
                    currency:'cad',
                    product_data:{
                      name: order.order_id,
                    },
                    unit_amount : Math.round(order.total_amount) * 100,
                  },
                  quantity: 1
            }],
            mode: 'payment',
            success_url: `${process.env.DOMAIN_NAME}/success?_id=${order._id}`, // http://localhost:3000/success
            cancel_url: `${process.env.DOMAIN_NAME}/order`,
        });
        return { stripe_session_id: session.id , stripe_payment_url: session.url };
    } catch (error) {
        console.log({error});
        throw new Error('create new stripe session id: FAILED');
    }
};

module.exports = createStripeSession;