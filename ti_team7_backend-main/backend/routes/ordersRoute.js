const express = require('express');
const orderController = require('../controllers/orderController');




const router = express.Router();

router.post("/api/v1/order/createNewOrder", orderController.createNewOrder);



module.exports = router;