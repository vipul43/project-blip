const jwt = require("jsonwebtoken");
const codes = require("../utils/codes.util.js");
const errors = require("../utils/errors.util.js");

function getSecret(userType) {
  if (userType === "User") {
    return process.env.USER_JWT_TOKEN_SECRET;
  } else if (userType === "Partner") {
    return process.env.PARTNER_JWT_TOKEN_SECRET;
  } else {
    throw errors.TOKEN_GENERATION_FAILED;
  }
}

exports.generate = (user) => {
  try {
    const token = jwt.sign(user, getSecret(user.role), {
      expiresIn: "1800s",
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
  if (!req || !req.body || !req.body || !req.body.role) {
    return res
      .status(codes.UNAUTHORIZED)
      .json({ error: errors.INVALID_USER_CREDENTIALS });
  }
  jwt.verify(token, getSecret(req.body.role), (error, user) => {
    if (error) {
      return res
        .status(codes.FORBIDDEN)
        .json({ error: errors.AUTHENTICATION_FAILED });
    } else {
      next();
    }
  });
};
