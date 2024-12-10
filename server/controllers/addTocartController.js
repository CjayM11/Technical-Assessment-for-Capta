const shoppingCart = require('../models/shopping_cart');

const getCart = async (req, res) => {
    try {
        const userId = req.params.userId; 
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
            // If product doesnt exist , create new 
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
        const { userId, productId } = req.params;

        // Find item
        const cartItem = await shoppingCart.findOne({ userId: userId, productId: productId });

    
        if (cartItem) {
            // Reduce quantity ( TODO : fix addition of quantity )
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                await cartItem.save(); // Save the updated cart item
                return res.status(200).json({ message: 'Product quantity decreased by 1' });
            }
            // Remove if its less then 1
            else {
                await shoppingCart.deleteOne({ userId: userId, productId: productId });
                return res.status(200).json({ message: 'Product removed from cart' });
            }
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update cart' });
    }
};

module.exports = { getCart, addToCart, removeFromCart };
