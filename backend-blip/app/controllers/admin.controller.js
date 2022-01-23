const tokenController = require("./token.controller.js");

exports.handleExpiredTokens = async () => {
  try {
    await tokenController.expireAll();
  } catch (error) {
    console.log(errors.COULD_NOT_EXPIRE_ALL_TOKENS);
  }
};
