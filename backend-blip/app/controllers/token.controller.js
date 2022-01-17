const mongodb = require("../utils/mongodb.util.js");
const db = require("../models");
const tokenModel = db.token;

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

exports.expire = async (userId) => {
  const findObj = {
    userId: userId,
  };
  const updateObj = {
    $set: {
      tokens: [],
    },
  };
  const updateConfig = {};
  try {
    await mongodb.updateOne(tokenModel, findObj, updateObj, updateConfig);
  } catch (error) {
    throw error;
  }
};
