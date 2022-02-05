const errors = require("../utils/errors.util.js");
const codes = require("../utils/codes.util.js");
const mongodb = require("../utils/mongodb.util.js");
const db = require("../models");
const blog = db.blog;

exports.handleBlogCreation = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) throw errors.INVALID_PAYLOAD;
    if (!payload.title) throw errors.INVALID_PAYLOAD;
    if (!payload.content) throw errors.INVALID_PAYLOAD;
    const result = await mongodb.createOne(blog, payload);
    res.status(codes.CREATED).json({ blog: result });
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.CREATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
    }
  }
};

exports.handleBlogFetchAll = async (req, res) => {
  try {
    const result = await mongodb.findAll(blog, {});
    res.status(codes.OK).json({ blogs: result });
  } catch (error) {
    res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
  }
};

exports.handleBlogFetch = async (req, res) => {
  try {
    if (!req.params) throw errors.INVALID_PAYLOAD;
    const blogId = req.params.blogId;
    if (!blogId) throw errors.INVALID_PAYLOAD;
    const findObj = {
      _id: blogId,
    };
    const result = await mongodb.findOne(blog, findObj);
    res.status(codes.OK).json({ blog: result });
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.VALIDATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
    }
  }
};
