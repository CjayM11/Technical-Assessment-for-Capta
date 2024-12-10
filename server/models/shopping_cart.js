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
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: String,
        required: true,
        default: 1,
    }
});

const shoppingCart = mongoose.model('Cart', shoppingCartSchema,'shopping_cart');
module.exports = shoppingCart;