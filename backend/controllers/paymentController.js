// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')("sk_test_51M2RnIJWdYJbdc7Dq0LtMMqKlNySVp7jK1j2yjUcvgEuy61TuG7bjtnRB7pXdSpI47UHjo3vegj6FaYAMeT0Wb7e001VhHejUO");



const paymentController = {
    processPayment: async(req, res) => {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'VND',
            metadata: { integration_check: 'accept_a_payment' }
        });
    
        res.status(200).json({
            success: true,
            client_secret: paymentIntent.client_secret
        });
    },
    sendStripApi: async(req, res) => {
        res.status(200).json({
            stripeApiKey: process.env.STRIPE_API_KEY
        })
    }
};

module.exports = paymentController;