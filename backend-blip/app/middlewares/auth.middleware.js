const jwt = require("jsonwebtoken");
const codes = require("../utils/codes.util.js");
const errors = require("../utils/errors.util.js");

// helper functions
function getSecret(userType) {
  if (userType === "User") {
    return process.env.USER_JWT_TOKEN_SECRET;
  } else if (userType === "Partner") {
    return process.env.PARTNER_JWT_TOKEN_SECRET;
  } else if (userType === "Admin") {
    return process.env.ADMIN_JWT_TOKEN_SECRET;
  } else {
    throw errors.TOKEN_GENERATION_FAILED;
  }
}

exports.tokenExpirySeconds = 1800;

exports.generate = (user) => {
  try {
    const token = jwt.sign(user, getSecret(user.role), {
      expiresIn: module.exports.tokenExpirySeconds.toString() + "s",
    });
    return token;
  } catch (error) {
    throw errors.TOKEN_GENERATION_FAILED;
  }
};

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(codes.UNAUTHORIZED).json({ error: errors.INVALID_TOKEN });
  }
  if (!req || !req.query || !req.query.role) {
    return res
      .status(codes.UNAUTHORIZED)
      .json({ error: errors.INVALID_USER_CREDENTIALS });
  }
  jwt.verify(token, getSecret(req.query.role), (error, user) => {
    if (error) {
      return res
        .status(codes.FORBIDDEN)
        .json({ error: errors.AUTHENTICATION_FAILED });
    } else {
      next();
    }
  });
};
