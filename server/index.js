require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const express = require("express");
const app = express();
app.use(express.json()); 
const cors = require('cors');
app.use(cors());

// const cors = require("cors");
// const corsOptions = {
//   origin: '*',
// };
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
//app.use(cors(corsOptions));



mongoose.connect(MONGO_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

app.listen(8080,() =>{
    console.log("Server started on port 8080");
});

module.exports = mongoose;