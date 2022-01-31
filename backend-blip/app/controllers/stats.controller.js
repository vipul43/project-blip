const errors = require("../utils/errors.util.js");
const codes = require("../utils/codes.util.js");
const mongodb = require("../utils/mongodb.util.js");
const db = require("../models");
const user = db.user;
const donation = db.donation;
const partner = db.partner;

exports.handleActiveUserCount = async (req, res) => {
  try {
    const result = await mongodb.findAll(user, {});
    const count = result.length;
    res.status(codes.OK).json({ count: count });
  } catch (error) {
    res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
  }
};

exports.handleActivePartnerCount = async (req, res) => {
  try {
    const result = await mongodb.findAll(partner, {});
    const count = result.length;
    res.status(codes.OK).json({ count: count });
  } catch (error) {
    res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
  }
};

exports.handleDonationCount = async (req, res) => {
  try {
    const result = await mongodb.findAll(donation, {});
    const count = result.length;
    res.status(codes.OK).json({ count: count });
  } catch (error) {
    res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
  }
};
