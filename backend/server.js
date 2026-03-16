const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // Brings in your new database file

// Connect to the database
connectDB(); // Fires the connection right as the server starts

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ message: "Pokemon Draft League Backend is alive!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is successfully running on port ${PORT}`);
});