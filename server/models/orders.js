const mongoose = require('mongoose');

//Define model

const ordersSchema = new mongoose.Schema({
    orderId:{
        type:String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.String,
        ref: 'users'
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.String,
            ref: 'products'
        },
        quantity: {
            type: Number,
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

const orders = mongoose.model('Orders', ordersSchema,'orders');
module.exports = orders;