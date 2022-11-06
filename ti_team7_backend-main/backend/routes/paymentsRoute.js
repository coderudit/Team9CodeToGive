const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/api/v1/checkout/payment/create-checkout-session',paymentController.createCheckoutSession);

module.exports = router;