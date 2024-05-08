// Assuming you have already set up your Express server
const express = require('express');
const router = express.Router();

// Middleware to check authentication status
const authenticate = (req, res, next) => {
  if (req.cookies.token) {
    // If the token exists in the cookies, the user is authenticated
    next();
  } else {
    // If the token does not exist, the user is not authenticated
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Route to check authentication status
router.get('/auth/check', authenticate, (req, res) => {
  // If the middleware passes, it means the user is authenticated
  res.status(200).json({ message: 'Authenticated' });
});



module.exports = router;
