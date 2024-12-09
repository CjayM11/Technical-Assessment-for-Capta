const mongoose = require('mongoose');

//TODO : Check requirements for a collection using FK

//Define model
const shoppingCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.String,
        ref: 'users',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.String,
        ref: 'products',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const shoppingCart = mongoose.model('Cart', shoppingCartSchema,'shopping_cart');
module.exports = shoppingCart;