const errors = require("../utils/errors.util.js");
const codes = require("../utils/codes.util.js");
const crypt = require("../utils/crypt.util.js");
const mongodb = require("../utils/mongodb.util.js");
const mail = require("../utils/mail.util.js");
const phone = require("../utils/phone.util.js");
const auth = require("../middlewares/auth.middleware.js");
const db = require("../models");
const tokenController = require("./token.controller.js");
const user = db.user;
const donation = db.donation;
const partner = db.partner;

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
      auth: result.role,
    });
    if (!token) throw errors.TOKEN_GENERATION_FAILED;
    await tokenController.save(result._id, token, req.query.auth);
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
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
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
      auth: result.role,
    });
    if (!token) throw errors.TOKEN_GENERATION_FAILED;
    await tokenController.save(result._id, token, req.query.auth);
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
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
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
    const valid = await tokenController.find(
      payload._id,
      token,
      req.query.auth
    );
    if (!valid) throw errors.AUTHENTICATION_FAILED;
    const findObj = {
      _id: payload._id,
    };
    const result = await mongodb.findOne(user, findObj);
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
    await tokenController.delete(payload._id, token, req.query.auth);
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
    if (!payload) throw errors.INVALID_PAYLOAD;
    if (!payload.email) throw errors.INVALID_PAYLOAD;
    const findObj = {
      email: payload.email,
    };
    const invalid = await mongodb.findOne(user, findObj);
    if (!invalid) throw errors.USER_NOT_FOUND;
    const updateConfig = {
      upsert: false,
    };
    await mongodb.updateOne(user, findObj, payload, updateConfig);
    res.status(codes.ACCEPTED).json({ token: token, user: payload });
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.USER_NOT_FOUND) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.UPDATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
    }
  }
};

exports.handleUserDeletion = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) throw errors.INVALID_PAYLOAD;
    if (!payload._id) throw errors.INVALID_PAYLOAD;
    const headers = req.headers;
    if (!headers) throw errors.INVALID_PAYLOAD;
    const authHeader = headers["authorization"];
    if (!authHeader) throw errors.INVALID_PAYLOAD;
    const token = authHeader.split(" ")[1];
    if (!token) throw errors.INVALID_PAYLOAD;
    await tokenController.delete(payload._id, token, req.query.auth);
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
    await mongodb.deleteOne(user, result);
    const obj = result.toObject();
    delete obj.password;
    res.status(codes.ACCEPTED).json({ user: obj });
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.INVALID_USER_CREDENTIALS) {
      res.status(codes.UNAUTHORIZED).json({ error: error });
    } else if (error === errors.VALIDATION_FAILED) {
      res.status(codes.UNAUTHORIZED).json({ error: error });
    } else if (error === errors.DELETION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else if (error === errors.UPDATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
    }
  }
};

exports.handleUserGenerateResetPasswordLink = async (req, res) => {
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
    const token = auth.generate({
      username: result.username,
      email: result.email,
      password: result.password,
      auth: "User-Reset-Password",
    });
    if (!token) throw errors.TOKEN_GENERATION_FAILED;
    await tokenController.save(result._id, token, req.query.auth);
    const status = await mail.generateResetPasswordLinkUser(token, result);
    res.status(codes.ACCEPTED).json({ status: status });
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.INVALID_USER_CREDENTIALS) {
      res.status(codes.UNAUTHORIZED).json({ error: error });
    } else if (error === errors.VALIDATION_FAILED) {
      res.status(codes.UNAUTHORIZED).json({ error: error });
    } else if (error === errors.TOKEN_GENERATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else if (error === errors.MAIL_SENDING_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
    }
  }
};

exports.handleUserResetPassword = async (req, res) => {
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
    if (!result) throw errors.USER_NOT_FOUND;
    const headers = req.headers;
    if (!headers) throw errors.INVALID_PAYLOAD;
    const authHeader = headers["authorization"];
    if (!authHeader) throw errors.INVALID_PAYLOAD;
    const token = authHeader.split(" ")[1];
    if (!token) throw errors.INVALID_PAYLOAD;
    const valid = await tokenController.find(result._id, token, req.query.auth);
    if (!valid) throw errors.AUTHENTICATION_FAILED;
    if (!payload.password) throw errors.INVALID_PAYLOAD;
    const hashedPassword = await crypt.hashAndSalt(payload.password);
    if (!hashedPassword) throw errors.HASHING_FAILED;
    payload.password = hashedPassword;
    const updateConfig = {
      upsert: false,
    };
    await mongodb.updateOne(user, findObj, payload, updateConfig);
    await tokenController.delete(result._id, token, req.query.auth);
    delete payload.password;
    res.status(codes.ACCEPTED).json({ user: payload });
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.AUTHENTICATION_FAILED) {
      res.status(codes.FORBIDDEN).json({ error: error });
    } else if (error === errors.USER_NOT_FOUND) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.HASHING_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else if (error === errors.UPDATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
    }
  }
};

exports.handleUserGenerateVerifyEmailLink = async (req, res) => {
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
    if (!result.isEmailVerified) {
      const token = auth.generate({
        username: result.username,
        email: result.email,
        password: result.password,
        auth: "User-Verify-Email",
      });
      if (!token) throw errors.TOKEN_GENERATION_FAILED;
      await tokenController.save(result._id, token, req.query.auth);
      const status = await mail.generateVerifyEmailLinkUser(token, result);
      res.status(codes.ACCEPTED).json({ status: status });
    } else {
      res.status(codes.ACCEPTED).json();
    }
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.INVALID_USER_CREDENTIALS) {
      res.status(codes.UNAUTHORIZED).json({ error: error });
    } else if (error === errors.VALIDATION_FAILED) {
      res.status(codes.UNAUTHORIZED).json({ error: error });
    } else if (error === errors.TOKEN_GENERATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else if (error === errors.MAIL_SENDING_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
    }
  }
};

exports.handleUserVerifyEmail = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) throw errors.INVALID_PAYLOAD;
    if (!!payload.isEmailVerified) throw errors.INVALID_PAYLOAD;
    if (!payload.isEmailVerified) {
      if (!payload.username) throw errors.INVALID_PAYLOAD;
      if (!payload.email) throw errors.INVALID_PAYLOAD;
      const findObj = {
        username: payload.username,
        email: payload.email,
      };
      const result = await mongodb.findOne(user, findObj);
      if (!result) throw errors.USER_NOT_FOUND;
      const headers = req.headers;
      if (!headers) throw errors.INVALID_PAYLOAD;
      const authHeader = headers["authorization"];
      if (!authHeader) throw errors.INVALID_PAYLOAD;
      const token = authHeader.split(" ")[1];
      if (!token) throw errors.INVALID_PAYLOAD;
      const valid = await tokenController.find(
        result._id,
        token,
        req.query.auth
      );
      if (!valid) throw errors.AUTHENTICATION_FAILED;
      payload.isEmailVerified = true;
      const updateConfig = {
        upsert: false,
      };
      await mongodb.updateOne(user, findObj, payload, updateConfig);
      await tokenController.delete(result._id, token, req.query.auth);
    }
    res.status(codes.ACCEPTED).json({ user: payload });
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.AUTHENTICATION_FAILED) {
      res.status(codes.FORBIDDEN).json({ error: error });
    } else if (error === errors.USER_NOT_FOUND) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.HASHING_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else if (error === errors.UPDATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
    }
  }
};

exports.handleUserGenerateVerifyPhoneLink = async (req, res) => {
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
    if (!result.isPhoneVerified) {
      const token = auth.generate({
        username: result.username,
        email: result.email,
        password: result.password,
        auth: "User-Verify-Phone",
      });
      if (!token) throw errors.TOKEN_GENERATION_FAILED;
      await tokenController.save(result._id, token, req.query.auth);
      const status = await phone.generateVerifyPhoneLinkUser(token, result);
      res.status(codes.ACCEPTED).json({ status: status });
    } else {
      res.status(codes.ACCEPTED).json();
    }
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.INVALID_USER_CREDENTIALS) {
      res.status(codes.UNAUTHORIZED).json({ error: error });
    } else if (error === errors.VALIDATION_FAILED) {
      res.status(codes.UNAUTHORIZED).json({ error: error });
    } else if (error === errors.TOKEN_GENERATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else if (error === errors.MESSAGE_SENDING_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
    }
  }
};

exports.handleUserVerifyPhone = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) throw errors.INVALID_PAYLOAD;
    if (!!payload.isPhoneVerified) throw errors.INVALID_PAYLOAD;
    if (!payload.isPhoneVerified) {
      if (!payload.username) throw errors.INVALID_PAYLOAD;
      if (!payload.email) throw errors.INVALID_PAYLOAD;
      const findObj = {
        username: payload.username,
        email: payload.email,
      };
      const result = await mongodb.findOne(user, findObj);
      if (!result) throw errors.USER_NOT_FOUND;
      const headers = req.headers;
      if (!headers) throw errors.INVALID_PAYLOAD;
      const authHeader = headers["authorization"];
      if (!authHeader) throw errors.INVALID_PAYLOAD;
      const token = authHeader.split(" ")[1];
      if (!token) throw errors.INVALID_PAYLOAD;
      const valid = await tokenController.find(
        result._id,
        token,
        req.query.auth
      );
      if (!valid) throw errors.AUTHENTICATION_FAILED;
      payload.isPhoneVerified = true;
      const updateConfig = {
        upsert: false,
      };
      await mongodb.updateOne(user, findObj, payload, updateConfig);
      await tokenController.delete(result._id, token, req.query.auth);
    }
    res.status(codes.ACCEPTED).json({ user: payload });
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.AUTHENTICATION_FAILED) {
      res.status(codes.FORBIDDEN).json({ error: error });
    } else if (error === errors.USER_NOT_FOUND) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.HASHING_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else if (error === errors.UPDATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
    }
  }
};

exports.handleUserDonation = async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        if (!req.params) throw errors.INVALID_PAYLOAD;
        const userId = req.params.userId;
        if (!userId) throw errors.INVALID_PAYLOAD;
        const headers = req.headers;
        if (!headers) throw errors.INVALID_PAYLOAD;
        const authHeader = headers["authorization"];
        if (!authHeader) throw errors.INVALID_PAYLOAD;
        const token = authHeader.split(" ")[1];
        if (!token) throw errors.INVALID_PAYLOAD;
        const valid = await tokenController.find(userId, token, req.query.auth);
        if (!valid) throw errors.AUTHENTICATION_FAILED;
        if (!req.query) throw errors.INVALID_PAYLOAD;
        const isArchived = req.query.isArchived;
        const findObj = {};
        if (isArchived) {
          findObj.userId = userId;
          findObj.isUserArchived = isArchived;
        } else {
          findObj.userId = userId;
        }
        const result = await mongodb.findAll(donation, findObj);
        const objArray = await Promise.all(
          result.map(async (d) => {
            const obj = d.toObject();
            const findObj2 = {
              _id: obj.partnerId,
            };
            delete obj.partnerId;
            delete obj.isPartnerArchived;
            const result2 = await mongodb.findOne(partner, findObj2);
            if (result2) {
              const obj2 = result2.toObject();
              delete obj2._id;
              delete obj2.username;
              delete obj2.type;
              delete obj2.password;
              delete obj2.role;
              delete obj2.__v;
              delete obj2.createdAt;
              delete obj2.updatedAt;
              Object.assign(obj, obj2);
            }
            return obj;
          })
        );
        res.status(codes.ACCEPTED).json({ donations: objArray });
      } catch (error) {
        console.log(error);
        if (error === errors.INVALID_PAYLOAD) {
          res.status(codes.BAD_REQUEST).json({ error: error });
        } else if (error === errors.VALIDATION_FAILED) {
          res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
        } else {
          res
            .status(codes.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
        }
      }
      break;
    case "POST":
      try {
        const payload = req.body;
        if (!payload) throw errors.INVALID_PAYLOAD;
        if (!req.params) throw errors.INVALID_PAYLOAD;
        const userId = req.params.userId;
        if (!userId) throw errors.INVALID_PAYLOAD;
        const headers = req.headers;
        if (!headers) throw errors.INVALID_PAYLOAD;
        const authHeader = headers["authorization"];
        if (!authHeader) throw errors.INVALID_PAYLOAD;
        const token = authHeader.split(" ")[1];
        if (!token) throw errors.INVALID_PAYLOAD;
        const valid = await tokenController.find(userId, token, req.query.auth);
        if (!valid) throw errors.AUTHENTICATION_FAILED;
        payload.isAssigned = true;
        payload.userId = userId;
        payload.donationStatus = "ASSIGNED";
        if (!payload.donationId) throw errors.INVALID_PAYLOAD;
        const findObj = {
          _id: payload.donationId,
        };
        delete payload.donationId;
        const updateConfig = {
          upsert: false,
        };
        await mongodb.updateOne(donation, findObj, payload, updateConfig);
        res.status(codes.CREATED).json({ donation: payload });
      } catch (error) {
        if (error === errors.INVALID_PAYLOAD) {
          res.status(codes.BAD_REQUEST).json({ error: error });
        } else if (error === errors.CREATION_FAILED) {
          res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
        } else {
          res
            .status(codes.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
        }
      }
      break;
    case "PUT":
      try {
        const payload = req.body;
        if (!payload) throw errors.INVALID_PAYLOAD;
        if (!req.params) throw errors.INVALID_PAYLOAD;
        const userId = req.params.userId;
        if (!userId) errors.INVALID_PAYLOAD;
        const headers = req.headers;
        if (!headers) throw errors.INVALID_PAYLOAD;
        const authHeader = headers["authorization"];
        if (!authHeader) throw errors.INVALID_PAYLOAD;
        const token = authHeader.split(" ")[1];
        if (!token) throw errors.INVALID_PAYLOAD;
        const valid = await tokenController.find(userId, token, req.query.auth);
        if (!valid) throw errors.AUTHENTICATION_FAILED;
        const donationId = req.params.donationId;
        if (!donationId) throw errors.INVALID_PAYLOAD;
        const findObj = {
          _id: donationId,
          userId: userId,
        };
        const updateConfig = {
          upsert: false,
        };
        await mongodb.updateOne(donation, findObj, payload, updateConfig);
        payload.userId = userId;
        payload.donationId = donationId;
        res.status(codes.OK).json({ donation: payload });
      } catch (error) {
        if (error === errors.INVALID_PAYLOAD) {
          res.status(codes.BAD_REQUEST).json({ error: error });
        } else if (error === errors.CREATION_FAILED) {
          res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
        } else {
          res
            .status(codes.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
        }
      }
      break;
    default:
      res.status(codes.BAD_REQUEST).json({ error: errors.HTTP_NOT_ALLOWED });
      break;
  }
};
