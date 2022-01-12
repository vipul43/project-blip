const jwt = require("jsonwebtoken");
const codes = require("../commons/codes.js");
const errors = require("../commons/errors.js");

exports.generate = (username) => {
  try {
    const token = jwt.sign(username, process.env.JWT_TOKEN_SECRET, {
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
  if (token == null)
    return res.status(codes.UNAUTHORIZED).json({ error: errors.INVALID_TOKEN });
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, user) => {
    if (error)
      return res
        .status(codes.FORBIDDEN)
        .json({ error: errors.AUTHENTICATION_FAILED });
    next();
  });
};
