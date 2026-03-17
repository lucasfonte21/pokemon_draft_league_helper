const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

// Register Route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Protected Route 
router.get('/me', protect, (req, res) => {
  res.status(200).json(req.user);
});


module.exports = router;