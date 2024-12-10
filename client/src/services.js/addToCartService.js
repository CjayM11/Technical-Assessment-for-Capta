import axios from 'axios';

const getCart = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/users/cart/${userId}`);
        if (response.status === 200) {
            return { success: true, cart: response.data.cart };
        } else {
            return { success: false, message: 'Failed to fetch cart details' };
        }
    } catch (err) {
        console.error('Error fetching cart details:', err);
        return { success: false, message: 'An error occurred. Please try again.' };
    }
};

const addToCart = async (userId, productId, quantity) => {
    try {
        const response = await axios.post('http://localhost:8080/api/users/cart/add', {
            userId,
            productId,
            quantity,
        });
        console.log('Response from addToCart:', response);
        if (response.status === 201 || response.status === 200) {
            return { success: true, message: response.data.message, cartItem: response.data.cartItem };
        } else {
            return { success: false, message: 'Failed to add product to cart' };
        }
    } catch (err) {
        console.error('Error adding product to cart:', err);
        return { success: false, message: 'An error occurred. Please try again.' };
    }
    
};

const removeCartItem  = async (userId, productId) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/users/cart/remove/${userId}/${productId}`);
        
        if (response.status === 200) {
            return { success: true, message: response.data.message };
        } else {
            return { success: false, message: 'Failed to remove product from cart' };
        }
    } catch (err) {
        console.error('Error removing product from cart:', err);
        return { success: false, message: 'An error occurred. Please try again.' };
    }
};


export { getCart,addToCart,removeCartItem };
