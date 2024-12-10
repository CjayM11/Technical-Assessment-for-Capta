require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const path = require("path");
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

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});
mongoose.connect(MONGO_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = mongoose;