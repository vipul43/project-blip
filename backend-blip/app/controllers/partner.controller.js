const errors = require("../utils/errors.util.js");
const codes = require("../utils/codes.util.js");
const crypt = require("../utils/crypt.util.js");
const mongodb = require("../utils/mongodb.util.js");
const auth = require("../middlewares/auth.middleware.js");
const db = require("../models");
const tokenController = require("./token.controller.js");
const partner = db.partner;
const donation = db.donation;

exports.handlePartnerCreation = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) throw errors.INVALID_PAYLOAD;
    if (!payload.email) throw errors.INVALID_PAYLOAD;
    const findObj = {
      email: payload.email,
    };
    const invalid = await mongodb.findOne(partner, findObj);
    if (invalid) throw errors.USER_ALREADY_EXISTS;
    if (!payload.password) throw errors.INVALID_PAYLOAD;
    const hashedPassword = await crypt.hashAndSalt(payload.password);
    if (!hashedPassword) throw errors.HASHING_FAILED;
    payload.password = hashedPassword;
    payload.role = "Partner";
    const result = await mongodb.createOne(partner, payload);
    const token = auth.generate({
      partnerName: result.partnerName,
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

exports.handlePartnerValidation = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) throw errors.INVALID_PAYLOAD;
    if (!payload.partnerName) throw errors.INVALID_PAYLOAD;
    if (!payload.email) throw errors.INVALID_PAYLOAD;
    const findObj = {
      partnerName: payload.partnerName,
      email: payload.email,
    };
    const result = await mongodb.findOne(partner, findObj);
    if (!result) throw errors.INVALID_USER_CREDENTIALS;
    if (!payload.password) throw errors.INVALID_PAYLOAD;
    const valid = await crypt.compareHash(payload.password, result.password);
    if (!valid) throw errors.VALIDATION_FAILED;
    const token = auth.generate({
      partnerName: result.partnerName,
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
    } else if (error === errors.UPDATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
  }
};

exports.handlePartnerAuthentication = async (req, res) => {
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

exports.handlePartnerInvalidation = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) throw errors.INVALID_PAYLOAD;
    const headers = req.headers;
    if (!headers) throw errors.INVALID_PAYLOAD;
    const authHeader = headers["authorization"];
    if (!authHeader) throw errors.INVALID_PAYLOAD;
    const token = authHeader.split(" ")[1];
    if (!token) throw errors.INVALID_PAYLOAD;
    await tokenController.delete(req.body._id, token);
    res.status(codes.ACCEPTED).json(req.body);
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

exports.handlePartnerDonation = async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        if (!req.params) throw errors.INVALID_PAYLOAD;
        const partnerId = req.params.partnerId;
        if (!partnerId) throw errors.INVALID_PAYLOAD;
        const findObj = {
          partnerId: partnerId,
        };
        const result = await mongodb.findAll(donation, findObj);
        const objArray = result.map((d) => {
          const obj = d.toObject();
          delete obj.isAssigned;
          delete obj.userId;
          delete obj.donationName;
          delete obj.isArchived;
          delete obj.issues;
          return obj;
        });
        res.status(codes.ACCEPTED).json({ donations: objArray });
      } catch (error) {
        if (error === errors.INVALID_PAYLOAD) {
          res.status(codes.BAD_REQUEST).json({ error: error });
        } else if (error === errors.VALIDATION_FAILED) {
          res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
        } else {
          res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
        }
      }
      break;
    case "POST":
      try {
        const payload = req.body;
        if (!payload) throw errors.INVALID_PAYLOAD;
        if (!req.params) throw errors.INVALID_PAYLOAD;
        const partnerId = req.params.partnerId;
        if (!partnerId) throw errors.INVALID_PAYLOAD;
        payload.partnerId = partnerId;
        const result = await mongodb.createOne(donation, payload);
        const obj = result.toObject();
        res.status(codes.CREATED).json({ donation: obj });
      } catch (error) {
        if (error === errors.INVALID_PAYLOAD) {
          res.status(codes.BAD_REQUEST).json({ error: error });
        } else if (error === errors.CREATION_FAILED) {
          res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
        } else {
          res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
        }
      }
      break;
    default:
      res.status(codes.BAD_REQUEST).json({ error: errors.HTTP_NOT_ALLOWED });
      break;
  }
};
