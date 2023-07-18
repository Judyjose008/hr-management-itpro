require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const getStripePaymentSessionProperties = async (stripe_session_id) => {


    const session = await stripe.checkout.sessions.retrieve(stripe_session_id);

    return {
        payment_status: session.payment_status === 'paid'? true : false,
        total: session.amount_total
    };
};

module.exports = getStripePaymentSessionProperties;