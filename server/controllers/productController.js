const Product = require('../models/products');
const Order = require('../models/orders');

const getProducts = async (req, res) => {
  try {

    const limit = parseInt(req.query.limit) || 10;
    const products = await Product.find().limit(limit);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// const getOrders = async (req, res) => {
//   try {
//     const { userId } = req.query; // Extract userId from query parameters

//     if (!userId) {
//       return res.status(400).json({ message: 'UserId is required' });
//     }

//     // Fetch orders for the specified userId
//     const orders = await Order.find({ userId }).select('products.totalAmount orderStatus orderDate products.productId products.quantity -_id');

//     // Transform the orders to ensure the required fields are returned
//     const transformedOrders = orders.map(order => ({
//       products: order.products.map(p => ({
//         productId: p.productId,
//         quantity: p.quantity,
//       })),
//       totalAmount: order.totalAmount,
//       orderStatus: order.orderStatus,
//       orderDate: order.orderDate,
//     }));

//     res.status(200).json(transformedOrders);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch orders' });
//   }
// };
module.exports = { getProducts,getOrders };
