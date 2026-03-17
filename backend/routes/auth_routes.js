const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth_controller');
const { protect } = require('../middleware/auth_middleware');

// Register Route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Protected Route 
router.get('/me', protect, (req, res) => {
  res.status(200).json(req.user);
});


module.exports = router;