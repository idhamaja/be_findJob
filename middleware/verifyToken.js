const UserModel = require("../models/UserModel");
const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    JWT.verify(token, process.env.JWT_SEC, async (err, user) => {
      if (err) {
        res.status(403).json("Invalid token");
      } else {
        req.user = user;
        console.log(user);
        next();
      }
    });
  } else {
    return res.status(401).json("You are not authenticated!!");
  }
};

const verifyAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json("You are restricted from peforming this operation");
    }
  });
};

module.exports = { verifyToken, verifyAuthorization };
