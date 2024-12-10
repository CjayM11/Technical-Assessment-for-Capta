const express = require('express');
const router = express.Router();
const { loginUser,RegisterUser } = require('../controllers/usersController'); 
const { getProducts,getOrders } = require('../controllers/productController'); 
const {  getCart,addToCart,removeFromCart } = require('../controllers/addTocartController'); 

router.post('/login', loginUser);
router.post('/register', RegisterUser);

router.get('/products', getProducts);
router.get('/orders', getOrders);

router.get('/cart/:userId', getCart);
router.post('/cart/add', addToCart);
router.delete('/cart/remove/:userId/:productId', removeFromCart);
module.exports = router;
