const mongodb = require("../utils/mongodb.util.js");
const auth = require("../middlewares/auth.middleware.js");
const db = require("../models");
const tokenModel = db.token;

// helper functions
function tokenExpired(creationDateTime) {
  const currDateTime = new Date();
  return currDateTime - creationDateTime > auth.tokenExpirySeconds * 1000;
}

exports.save = async (userId, token) => {
  const findObj = {
    userId: userId,
  };
  const updateObj = {
    $addToSet: {
      tokens: {
        token: token,
        creation: new Date(),
      },
    },
  };
  const updateConfig = {
    upsert: true,
  };
  try {
    await mongodb.updateOne(tokenModel, findObj, updateObj, updateConfig);
  } catch (error) {
    throw error;
  }
};

exports.delete = async (userId, token) => {
  const findObj = {
    userId: userId,
  };
  const updateObj = {
    $pull: {
      tokens: {
        token: token,
      },
    },
  };
  const updateConfig = {
    safe: true,
  };
  try {
    await mongodb.updateOne(tokenModel, findObj, updateObj, updateConfig);
  } catch (error) {
    throw error;
  }
};

exports.find = async (userId, token) => {
  const findObj = {
    userId: userId,
    tokens: {
      $elemMatch: {
        token: token,
      },
    },
  };
  try {
    const result = await mongodb.findOne(tokenModel, findObj);
    return result;
  } catch (error) {
    throw error;
  }
};

exports.expireAll = async () => {
  try {
    const findObj = {};
    const result = await mongodb.findAll(tokenModel, findObj);
    result.forEach((user) => {
      const userId = user.userId;
      const tokens = user.tokens;
      tokens.forEach((item) => {
        if (tokenExpired(item.creation)) {
          module.exports.delete(userId, item.token);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
