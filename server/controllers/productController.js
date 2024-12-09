const Product = require('../models/products');

const getProducts = async (req,res) =>{
try{
const products = await Product.find();

res.status(200).json(products);
}catch{
console.error(error);
    }
};

module.exports = { getProducts}
