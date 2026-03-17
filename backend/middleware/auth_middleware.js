const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the request has an authorization header that starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract the token from the header (Format is usually: "Bearer <token_string>")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using your secret key from the .env file
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user in the database using the ID hidden inside the token
      // The .select('-password') part ensures we NEVER accidentally send the hashed password back
      req.user = await User.findById(decoded.id).select('-password');

      // 5. Everything looks good! Move on to the next function (the actual route)
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // 6. If there is no token at all, reject the request immediately
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };