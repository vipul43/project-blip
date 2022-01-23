const errors = require("../utils/errors.util.js");
const codes = require("../utils/codes.util.js");
const crypt = require("../utils/crypt.util.js");
const mongodb = require("../utils/mongodb.util.js");
const auth = require("../middlewares/auth.middleware.js");
const db = require("../models");
const tokenController = require("./token.controller.js");
const user = db.user;

exports.handleUserCreation = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) throw errors.INVALID_PAYLOAD;
    if (!payload.email) throw errors.INVALID_PAYLOAD;
    const findObj = {
      email: payload.email,
    };
    const invalid = await mongodb.findOne(user, findObj);
    if (invalid) throw errors.USER_ALREADY_EXISTS_WITH_EMAIL;
    if (!payload.password) throw errors.INVALID_PAYLOAD;
    const hashedPassword = await crypt.hashAndSalt(payload.password);
    if (!hashedPassword) throw errors.HASHING_FAILED;
    payload.password = hashedPassword;
    payload.role = "User";
    const result = await mongodb.createOne(user, payload);
    const token = auth.generate({
      username: result.username,
      email: result.email,
      password: result.password,
      role: result.role,
    });
    if (!token) throw errors.TOKEN_GENERATION_FAILED;
    await tokenController.save(result._id, token);
    const obj = result.toObject();
    delete obj.password;
    res.status(codes.CREATED).json({ token: token, user: obj });
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.USER_ALREADY_EXISTS_WITH_EMAIL) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.HASHING_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else if (error === errors.CREATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else if (error === errors.TOKEN_GENERATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else if (error === errors.UPDATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
  }
};

exports.handleUserValidation = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) throw errors.INVALID_PAYLOAD;
    if (!payload.username) throw errors.INVALID_PAYLOAD;
    if (!payload.email) throw errors.INVALID_PAYLOAD;
    const findObj = {
      username: payload.username,
      email: payload.email,
    };
    const result = await mongodb.findOne(user, findObj);
    if (!result) throw errors.INVALID_USER_CREDENTIALS;
    if (!payload.password) throw errors.INVALID_PAYLOAD;
    const valid = await crypt.compareHash(payload.password, result.password);
    if (!valid) throw errors.VALIDATION_FAILED;
    const token = auth.generate({
      username: result.username,
      email: result.email,
      password: result.password,
      role: result.role,
    });
    if (!token) throw errors.TOKEN_GENERATION_FAILED;
    await tokenController.save(result._id, token);
    const obj = result.toObject();
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
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
  }
};

exports.handleUserAuthentication = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) throw errors.INVALID_PAYLOAD;
    const headers = req.headers;
    if (!headers) throw errors.INVALID_PAYLOAD;
    const authHeader = headers["authorization"];
    if (!authHeader) throw errors.INVALID_PAYLOAD;
    const token = authHeader.split(" ")[1];
    if (!token) throw errors.INVALID_PAYLOAD;
    const valid = await tokenController.find(req.body._id, token);
    if (!valid) throw errors.AUTHENTICATION_FAILED;
    res.status(codes.ACCEPTED).json(req.body);
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

exports.handleUserInvalidation = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) throw errors.INVALID_PAYLOAD;
    const headers = req.headers;
    if (!headers) throw errors.INVALID_PAYLOAD;
    const authHeader = headers["authorization"];
    if (!authHeader) throw errors.INVALID_PAYLOAD;
    const token = authHeader.split(" ")[1];
    if (!token) throw errors.INVALID_PAYLOAD;
    await tokenController.delete(payload._id, token);
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

exports.handleUserUpdation = async (req, res) => {
  try {
    const headers = req.headers;
    if (!headers) throw errors.INVALID_PAYLOAD;
    const authHeader = headers["authorization"];
    if (!authHeader) throw errors.INVALID_PAYLOAD;
    const token = authHeader.split(" ")[1];
    if (!token) throw errors.INVALID_PAYLOAD;
    const payload = req.body;
    if(!payload) throw errors.INVALID_PAYLOAD;
    if (!payload.email) throw errors.INVALID_PAYLOAD;
    const findObj = {
      email: payload.email,
    };
    const invalid = await mongodb.findOne(user, findObj);
    if (!invalid) throw errors.USER_NOT_FOUND;
    const updateConfig = {
      upsert: false,
    }
    await mongodb.updateOne(user, findObj, payload, updateConfig);
    res.status(codes.OK).json({ token: token, user: payload });
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.USER_NOT_FOUND) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.UPDATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
  }
}
