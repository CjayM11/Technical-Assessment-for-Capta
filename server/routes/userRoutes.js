const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/usersController'); 
const { RegisterUser } = require('../controllers/usersController'); 
const { getProducts } = require('../controllers/productController'); 

router.post('/login', loginUser);
router.post('/register', RegisterUser);

router.get('/products', getProducts);

module.exports = router;
