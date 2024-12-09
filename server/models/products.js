const mongoose = require('mongoose');

//Define the Schema
const productSchema = new mongoose.Schema({
    productId :{
        type: String,
        required:true,
        unique: true
    },
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    stockQuantity:{
        type:Number
    },
    category:{
        type:String
    },
    imageUrl:{
        type:String
    }
});

//Create and export Model
const Product = mongoose.model('Product',productSchema,"products");
module.exports = Product;