const shoppingCart = require('../models/shopping_cart'); // Path to your shopping cart model

const getCart = async (req, res) => {
    try {
        const userId = req.params.userId;  // This is pulling the userId from the URL params
        if (!userId) {
            return res.status(400).json({ message: 'UserId is required' });
        }

        // Fetch cart data using the userId
        const cart = await shoppingCart.find({ userId });
        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Failed to fetch cart' });
    }
};

  const addToCart = async (req, res) => {
    try {
        const { productId, userId, quantity } = req.body;
    
        // Check if the product already exists in the cart for the user
        let cartItem = await shoppingCart.findOne({ productId, userId });

        if (cartItem) {
            // If the product exists, update the quantity
            cartItem.quantity += quantity;
            await cartItem.save();
            return res.status(200).json({ message: 'Product quantity updated', cartItem });
        } else {
            // If the product doesn't exist, create a new cart item
            const newCartItem = new shoppingCart({
                userId,
                productId,
                quantity
            });

            try {
                await newCartItem.save();
                return res.status(201).json({ message: 'Product added to cart', newCartItem });
            } catch (error) {
                console.error('Save error:', error);
                return res.status(500).json({ message: 'Failed to add product to cart' });
            }
            
            return res.status(201).json({ message: 'Product added to cart', newCartItem });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add product to cart' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params; // Extract userId and productId from URL parameters

        // Find the cart item for the specified user and product
        const cartItem = await shoppingCart.findOne({ userId: userId, productId: productId });

        // If the item exists in the cart
        if (cartItem) {
            // If quantity is greater than 1, decrease the quantity by 1
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                await cartItem.save(); // Save the updated cart item
                return res.status(200).json({ message: 'Product quantity decreased by 1' });
            } 
            // If quantity is 1, remove the product from the cart
            else {
                await shoppingCart.deleteOne({ userId: userId, productId: productId });
                return res.status(200).json({ message: 'Product removed from cart' });
            }
        } else {
            // If the product doesn't exist in the cart for the user
            return res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update cart' });
    }
};

module.exports = { getCart,addToCart,removeFromCart };
