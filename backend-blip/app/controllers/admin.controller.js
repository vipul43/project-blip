const errors = require("../utils/errors.util.js");
const codes = require("../utils/codes.util.js");
const crypt = require("../utils/crypt.util.js");
const mongodb = require("../utils/mongodb.util.js");
const auth = require("../middlewares/auth.middleware.js");
const db = require("../models");
const tokenController = require("./token.controller.js");
const admin = db.admin;
const user = db.user;
const partner = db.partner;

// helper functions
async function getAllUsers() {
  const findObj = {};
  let userResults = await mongodb.findAll(user, findObj);
  userResults = userResults.map((u) => {
    const obj = u.toObject();
    delete obj.password;
    return obj;
  });
  let partnerResults = await mongodb.findAll(partner, findObj);
  partnerResults = partnerResults.map((u) => {
    const obj = u.toObject();
    delete obj.password;
    return obj;
  });
  let adminResults = await mongodb.findAll(admin, findObj);
  adminResults = adminResults.map((u) => {
    const obj = u.toObject();
    delete obj.password;
    return obj;
  });
  const users = userResults.concat(partnerResults, adminResults);
  return users;
}

exports.handleExpiredTokens = async () => {
  try {
    await tokenController.expireAll();
  } catch (error) {
    console.log(errors.COULD_NOT_EXPIRE_ALL_TOKENS);
  }
};

exports.handleAdminValidation = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) throw errors.INVALID_PAYLOAD;
    if (!payload.username) throw errors.INVALID_PAYLOAD;
    if (!payload.email) throw errors.INVALID_PAYLOAD;
    const findObj = {
      username: payload.username,
      email: payload.email,
    };
    const result = await mongodb.findOne(admin, findObj);
    if (!result) throw errors.INVALID_USER_CREDENTIALS;
    if (!payload.password) throw errors.INVALID_PAYLOAD;
    const valid = await crypt.compareHash(payload.password, result.password);
    if (!valid) throw errors.VALIDATION_FAILED;
    const token = auth.generate({
      username: result.username,
      email: result.email,
      password: result.password,
      auth: result.role,
    });
    if (!token) throw errors.TOKEN_GENERATION_FAILED;
    await tokenController.save(result._id, token, req.query.auth);
    const obj = result.toObject();
    obj.adminId = result._id;
    obj.allUsers = await getAllUsers();
    delete obj.password;
    res.status(codes.ACCEPTED).json({ token: token, user: obj });
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.INVALID_USER_CREDENTIALS) {
      res.status(codes.UNAUTHORIZED).json({ error: error });
    } else if (error === errors.VALIDATION_FAILED) {
      res.status(codes.UNAUTHORIZED).json({ error: error });
    } else if (error === errors.TOKEN_GENERATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else if (error === error.UPDATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
    }
  }
};

exports.handleAdminAuthentication = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) throw errors.INVALID_PAYLOAD;
    const headers = req.headers;
    if (!headers) throw errors.INVALID_PAYLOAD;
    const authHeader = headers["authorization"];
    if (!authHeader) throw errors.INVALID_PAYLOAD;
    const token = authHeader.split(" ")[1];
    if (!token) throw errors.INVALID_PAYLOAD;
    const valid = await tokenController.find(
      payload.adminId,
      token,
      req.query.auth
    );
    if (!valid) throw errors.AUTHENTICATION_FAILED;
    const findObj = {
      _id: payload.adminId,
    };
    const result = await mongodb.findOne(admin, findObj);
    if (!result) throw errors.AUTHENTICATION_FAILED;
    const obj = result.toObject();
    delete obj.password;
    res.status(codes.ACCEPTED).json(obj);
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.AUTHENTICATION_FAILED) {
      res.status(codes.FORBIDDEN).json({ error: error });
    } else if (error === errors.VALIDATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ error: errors.COULD_NOT_SIGNOUT });
    }
  }
};

exports.handleAdminInvalidation = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) throw errors.INVALID_PAYLOAD;
    if (!payload.role) throw errors.INVALID_PAYLOAD;
    const headers = req.headers;
    if (!headers) throw errors.INVALID_PAYLOAD;
    const authHeader = headers["authorization"];
    if (!authHeader) throw errors.INVALID_PAYLOAD;
    const token = authHeader.split(" ")[1];
    if (!token) throw errors.INVALID_PAYLOAD;
    await tokenController.delete(payload.adminId, token, req.query.auth);
    res.status(codes.ACCEPTED).json(payload);
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.UPDATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ error: errors.COULD_NOT_SIGNOUT });
    }
  }
};

exports.handleAdminFetchUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(codes.ACCEPTED).json({ users: users });
  } catch (error) {
    res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
  }
};
