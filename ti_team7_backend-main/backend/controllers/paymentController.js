const dotenv = require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req,res) => {
    const domainUrl = 'https://happy-place-team7.herokuapp.com';
    const {line_items, customer_email, delivery} = req.body;
    if(!line_items || !customer_email){
        res.status(400).send({
            "message": "Missing required paramters",
            "success": false,
        });
    }
    let shippingRate;
    
    if(delivery===10){
        shippingRate = 'shr_1KiDbnLF0IW9HE4HD6THfizE';
    }

    let sessionVar;

    try{
        sessionVar = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            customer_email,
            success_url: `${domainUrl}/orderplaced`,
            cancel_url: `${domainUrl}/checkout/payments`,
        })
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).send({sessionUrl: sessionVar.url,});
    }catch(e){
        console.log(e);
        res.status(400).send({
            "message": "Error occured while processing",
            "success": false,
        });
    }

}


module.exports = {createCheckoutSession};