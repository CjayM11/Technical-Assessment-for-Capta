import axios from 'axios';

// get products
const getProducts = async () => {
    try {
        // Send a GET request to fetch all products
        const response = await axios.get('http://localhost:8080/api/users/products');
        const data = response.data;

        if (response.status === 200) {
            return { success: true, products: data };
        } else {
            return { success: false, message: 'Failed to fetch products.' };
        }
    } catch (err) {
        console.error('Error fetching products:', err);
        return { success: false, message: 'An error occurred. Please try again.' };
    }
};


// get orders for users ( order history )
const getOrders = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/users/orders');
        const data = response.data;

        if (response.status === 200) {
            return { success: true, products: data };
        } else {
            return { success: false, message: 'Failed to fetch products.' };
        }
    } catch (err) {
        console.error('Error fetching products:', err);
        return { success: false, message: 'An error occurred. Please try again.' };
    }
};

export default { getProducts, getOrders };