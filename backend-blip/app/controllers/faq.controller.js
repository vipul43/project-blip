const codes = require("../utils/codes.util.js");
const mongodb = require("../utils/mongodb.util.js");
const db = require("../models");
const faq = db.faq;

exports.handleFAQFetchAll = async (req, res) => {
  try {
    const result = await mongodb.findAll(faq, {});
    res.status(codes.OK).json({ faqs: result });
  } catch (error) {
    res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
  }
};
