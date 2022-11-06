const orderModel = require('../models/orders/orderModel');


const createNewOrder = async (req,res) => {
    
    //const {shippingInfo, shippingMethod, orderItems, paymentInfo, itemsAmount, taxAmount, shippingAmount, paymentAmount } = req.body;
    const billingAddress = req.body.billingAddress
    const orderItems = req.body.line_items;
    const paymentInfo = req.body.paymentInfo;
    const itemsAmount = (orderItems[0].price_data.unit_amount)/100;
    const taxAmount = itemsAmount*0.15
    const paymentAmount = itemsAmount + taxAmount;
    const userEmail = req.body.userEmail;
    const orderStatus = req.body.orderStatus;
    console.log(billingAddress);
    try{
        const order = await orderModel.create(
            {

                orderItems,
                userEmail,
                orderStatus,
                paymentInfo,
                itemsAmount,
                taxAmount,
                paymentAmount,
                paidAt: Date.now(),
                //user: req.user._id,
            }
        );
    
        res.status(201).send({
            "success": true,
            "message": "New Record Created"
        }    
        );
    }catch(err){
        console.log(err)
    }

    
}

module.exports = {createNewOrder};