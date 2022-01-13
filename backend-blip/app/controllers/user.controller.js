const db = require("../models");
const errors = require("../utils/errors.util.js");
const user = db.users;
const helper = require("../utils/helper.util.js");

exports.create = async (doc) => {
  if (doc && doc.firstName && doc.username && doc.email && doc.password) {
    try {
      const hashedPassword = await helper.hashAndSalt(doc.password);
      const new_user = new user({
        firstName: doc.firstName,
        secondName: doc.secondName,
        username: doc.username,
        email: doc.email,
        phone: doc.phone,
        password: hashedPassword,
      });
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
  if (doc && doc.username && doc.email && doc.password) {
    try {
      const cursor = user.find({ name: doc.username }).cursor();
      for (
        let user = await cursor.next();
        user != null;
        user = await cursor.next()
      ) {
        if (doc.email === user.email) {
          const valid = await helper.compareHash(doc.password, user.password);
          if (valid) {
            return user;
          }
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
