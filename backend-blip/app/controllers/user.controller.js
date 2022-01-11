const db = require("../models");
const errors = require("../commons/errors.js");
const user = db.users;
const helper = require("../commons/helper.js");

exports.create = async (doc) => {
  try {
    if (doc.name && doc.password) {
      const hashedPassword = await helper.hashAndSalt(doc.password);
      const new_user = new user({ name: doc.name, password: hashedPassword });
      const result = await new_user.save();
      return result;
    } else {
      throw errors.INVALID_PAYLOAD;
    }
  } catch (error) {
    throw errors.CREATION_FAILED;
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
  try {
    if (doc.name && doc.password) {
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
    } else {
      throw errors.INVALID_PAYLOAD;
    }
  } catch (error) {
    throw errors.VALIDATION_FAILED;
  }
};

exports.update = (req, res) => {};

exports.delete = (req, res) => {};

exports.deleteAll = (req, res) => {};
