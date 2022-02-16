const jwt = require("jsonwebtoken");
const codes = require("../utils/codes.util.js");
const errors = require("../utils/errors.util.js");

// helper functions
function getSecret(auth) {
  if (auth === "User") {
    return process.env.USER_JWT_TOKEN_SECRET;
  } else if (auth === "Partner") {
    return process.env.PARTNER_JWT_TOKEN_SECRET;
  } else if (auth === "Admin") {
    return process.env.ADMIN_JWT_TOKEN_SECRET;
  } else if (auth === "User-Reset-Password") {
    return process.env.USER_RESET_PASSWORD_JWT_TOKEN_SECRET;
  } else if (auth === "Partner-Reset-Password") {
    return process.env.PARTNER_RESET_PASSWORD_JWT_TOKEN_SECRET;
  } else if (auth === "User-Verify-Email") {
    return process.env.USER_VERIFY_EMAIL_JWT_TOKEN_SECRET;
  } else {
    throw errors.TOKEN_GENERATION_FAILED;
  }
}

exports.tokenExpirySeconds = 1800;

exports.generate = (user) => {
  try {
    const token = jwt.sign(user, getSecret(user.auth), {
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
  if (!req || !req.query || !req.query.auth) {
    return res
      .status(codes.UNAUTHORIZED)
      .json({ error: errors.INVALID_USER_CREDENTIALS });
  }
  jwt.verify(token, getSecret(req.query.auth), (error, user) => {
    if (error) {
      return res
        .status(codes.FORBIDDEN)
        .json({ error: errors.AUTHENTICATION_FAILED });
    } else {
      next();
    }
  });
};
