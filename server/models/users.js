const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:true,
        unique: true
    },
    name: {
        type: String
    },
    email: {
        type: String,
        required:true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required:true,
        unique: true,
        minlength: [8, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String
    }
}, { timestamps: true });

// Create and export the model
const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
