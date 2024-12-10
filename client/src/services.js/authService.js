import axios from 'axios';


//login
const loginUser = async (email, password) => {
    const userData = { email, password };

    try {
        const response = await axios.post('http://localhost:8080/api/users/login', userData);
        const data = response.data;
        console.log('API Response:', data);
        if (response.status === 200) {
            return { success: true, user: data.user, token: data.token };

        } else {
            return { success: false, message: data.message };
        }
    } catch (err) {
        console.error('Login error:', err);
        return { success: false, message: 'An error occurred. Please try again.' };
    }
};

//Register
const RegisterUser = async (email, name, password, role) => {
    const userData = { name, email, password, role };

    try {
        const response = await axios.post('http://localhost:8080/api/users/register', userData);
        const data = response.data;

        if (response.status === 200) {
            return { success: true, token: data.token };
        } else {
            return { success: false, message: data.message };
        }
    } catch (err) {
        console.error('Login error:', err);
        return { success: false, message: 'An error occurred. Please try again.' };
    }
};

export { loginUser, RegisterUser };
