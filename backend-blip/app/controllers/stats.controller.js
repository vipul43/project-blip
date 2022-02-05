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
    res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
  }
};

exports.handleActivePartnerCount = async (req, res) => {
  try {
    const result = await mongodb.findAll(partner, {});
    const count = result.length;
    res.status(codes.OK).json({ count: count });
  } catch (error) {
    res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
  }
};

exports.handleDonationCount = async (req, res) => {
  try {
    const result = await mongodb.findAll(donation, {});
    const count = result.length;
    res.status(codes.OK).json({ count: count });
  } catch (error) {
    res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
  }
};
