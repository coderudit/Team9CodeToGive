const mongoose = require('mongoose');


const orderDetailsSchema = new mongoose.Schema({
    billingAddress: {
        firstName: {type: String},
        lastName: {type: String},
        streetAddress: {type: String},
        city: {type: String},
        state: {type: String},
        country: {type: String},
        zipCode: {type: String},
    },
    orderItems: 
        [
        {
        
        
        quantity:{type: Number, required: true},
        price_data: {
            currency: {type: String, required: true},
            unit_amount:{type: Number, required: true},
            product_data: {
                name: {type: String, required: true},
                description: {type: String, required: true},
                images: [{type: String, required: true}],
            },
        },
        tax_rates: [{type: String, required: true}],
    }
    ],
    orderStatus: {
        type: String, required: true, default: "Processing"
    },
    userEmail: {type: String, required: true},
    itemsAmount: {type: Number, required: true, default:0},
    taxAmount: {type: Number, required: true,default:0},
    paymentAmount: {type: Number, required: true, default:0},
    paidAt: {type: Date, required: true},
},
{timestamps: true}
);


module.exports = mongoose.model("order_details",orderDetailsSchema);