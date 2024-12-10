const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

//login Authentication
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Generated Token:", token); 
        
        const userData = {
            userId: user.userId,
            name: user.name,
            email: user.email,
        };

        res.status(200).json({
            message: "Login successful",
            user: userData, 
            token: token,    
        });

    } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
};


//Create and login user
const RegisterUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Get the highest userId
        const lastUser = await User.findOne().sort({ userId: -1 }).select('userId');
        let newUserId;

        // If no users exist, start with 1, else increment the highest userId by 1
        if (lastUser) {
            console.log(`Last userId: ${lastUser.userId}`); 
            newUserId = parseInt(lastUser.userId) + 1;
        } else {
            newUserId = 1; 
        }

        console.log(`Generated new userId: ${newUserId}`); 

        // Check if new userId already exists
        let userWithSameId = await User.findOne({ userId: newUserId.toString() });
        console.log(`Checking if userId ${newUserId} already exists: ${userWithSameId ? 'Exists' : 'Does not exist'}`); // Debugging line

        // If user with this ID exists, increment the userId again
        while (userWithSameId) {
            newUserId += 1;
            userWithSameId = await User.findOne({ userId: newUserId.toString() });
            console.log(`userId ${newUserId} already exists, trying next...`);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            userId: newUserId.toString(),
            name,
            email,
            password: hashedPassword,
            role: role || 'user', // Default to 'user' if role is not provided
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return success response with token
        res.status(201).json({ message: 'User registered successfully', token });

    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'An error occurred during registration', error });
    }
};




module.exports = {
    loginUser,RegisterUser
};
