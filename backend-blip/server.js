// importing modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const db = require("./app/models");
const connect = require("./mongodb.js");
const userController = require("./app/controllers/user.controller.js");
const errors = require("./app/commons/errors.js");
const codes = require("./app/commons/codes.js");

// setting up express app
const app = express();
var corsOptions = {
  origin: "http://localhost:8080",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connecting to mongodb database
connect(db);

// Admin APIs
app.post("/user/signup", async (req, res) => {
  try {
    const result = await userController.create(req.body);
    res.status(codes.CREATED).json({ userId: result.id });
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.CREATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.NOT_FOUND).json({ error: errors.NOT_FOUND });
    }
  }
});

app.post("/user/signin", async (req, res) => {
  try {
    const result = await userController.findOne(req.body);
    res.status(codes.ACCEPTED).json({ message: "Sign In Successful." });
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.VALIDATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else if (error === errors.INVALID_USER_CREDENTIALS) {
      res.status(codes.UNAUTHORIZED).json({ error: error });
    } else {
      res.status(codes.NOT_FOUND).json({ error: errors.NOT_FOUND });
    }
  }
});

// User APIs
// app.get('/user/:id', (req, res) => {
//     console.log(req.params.id);
// })

// listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
