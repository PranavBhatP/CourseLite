const jwt = require('jsonwebtoken');
secret_key = 'secret123'
function authenticateToken(req,res,next) {
    const token = req.headers['authorisation'];
    if(!token) return res.status(401).json({message: "Unauthorized"});
  
    jwt.verify(token,secret_key, (err,user) => {
      if (err) return res.status(403).json({message: "Forbidden"});
      req.user = user;
      next();
    })
  }

module.exports = authenticateToken;