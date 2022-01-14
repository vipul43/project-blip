const bcrypt = require("bcrypt");
const errors = require("./errors.util.js");

exports.hashAndSalt = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw errors.HASHING_FAILED;
  }
};

exports.compareHash = async (passwordExpected, passwordOriginal) => {
  try {
    const match = await bcrypt.compare(passwordExpected, passwordOriginal);
    return match;
  } catch (error) {
    throw errors.HASHING_FAILED;
  }
};
