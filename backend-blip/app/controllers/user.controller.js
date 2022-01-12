const db = require("../models");
const errors = require("../commons/errors.js");
const user = db.users;
const helper = require("../commons/helper.js");

exports.create = async (doc) => {
  if (doc && doc.name && doc.password) {
    try {
      const hashedPassword = await helper.hashAndSalt(doc.password);
      const new_user = new user({ name: doc.name, password: hashedPassword });
      const result = await new_user.save();
      return result;
    } catch (error) {
      throw errors.CREATION_FAILED;
    }
  } else {
    throw errors.INVALID_PAYLOAD;
  }
};

exports.findAll = async (req, res) => {
  try {
    const result = await user.find({});
    return result;
  } catch (error) {
    console.log(error);
  }
};

exports.findOne = async (doc) => {
  if (doc && doc.name && doc.password) {
    try {
      const cursor = user.find({ name: doc.name }).cursor();
      for (
        let user = await cursor.next();
        user != null;
        user = await cursor.next()
      ) {
        const valid = await helper.compareHash(doc.password, user.password);
        if (valid) {
          return user;
        }
      }
      throw errors.INVALID_USER_CREDENTIALS;
    } catch (error) {
      throw errors.VALIDATION_FAILED;
    }
  } else {
    throw errors.INVALID_PAYLOAD;
  }
};

exports.update = (req, res) => {};

exports.delete = (req, res) => {};

exports.deleteAll = (req, res) => {};
