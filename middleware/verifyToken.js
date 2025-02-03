const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Ambil token setelah "Bearer "

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res.status(403).json("Invalid token");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated, SORRY!!");
  }
};

// VERIFY TOKEN AND AUTHORIZATION
const verifyAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are restricted from performing this operation");
    }
  });
};

//VERIFY ADMIN
const verifyAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are restricted from performing this operation");
    }
  });
};

module.exports = { verifyToken, verifyAuthorization, verifyAndAdmin };
