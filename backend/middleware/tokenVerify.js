const jwt = require('jsonwebtoken');

/* eslint-disable consistent-return */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(401).json('Token is not valid! ');
      req.user = user;
      return next();
    });
  } else {
    return res.status(401).json('You are not authenticated');
  }
};
/* eslint-disable consistent-return */

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) {
      return next();
    }
    return res.status(403).json('You are not allowed to perform the operation!');
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      return next();
    }
    return res.status(403).json('You are not allowed to perform the operation!');
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
