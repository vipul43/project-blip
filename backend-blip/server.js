// importing modules
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const db = require("./app/models");
const connect = require("./mongodb.js");
const userController = require("./app/controllers/user.controller.js");
const errors = require("./app/commons/errors.js");
const codes = require("./app/commons/codes.js");
const auth = require("./app/auth/auth.js");

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

// User APIs
app.post("/user/signup", async (req, res) => {
  try {
    const user = await userController.create(req.body);
    const token = auth.generate({ username: req.body.name });
    res.status(codes.CREATED).json({ token: token, user: user });
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.CREATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else if (error === errors.TOKEN_GENERATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.NOT_FOUND).json({ error: error });
    }
  }
});

app.post("/user/signin", async (req, res) => {
  try {
    const user = await userController.findOne(req.body);
    const token = auth.generate({ username: req.body.name });
    res.status(codes.ACCEPTED).json({ token: token, user: user });
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      res.status(codes.BAD_REQUEST).json({ error: error });
    } else if (error === errors.VALIDATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else if (error === errors.INVALID_USER_CREDENTIALS) {
      res.status(codes.UNAUTHORIZED).json({ error: error });
    } else if (error === errors.TOKEN_GENERATION_FAILED) {
      res.status(codes.INTERNAL_SERVER_ERROR).json({ error: error });
    } else {
      res.status(codes.NOT_FOUND).json({ error: error });
    }
  }
});

app.post("/user/auth", auth.authenticate, async (req, res) => {
  if (req && req.body) {
    res.status(codes.ACCEPTED).json(req.body);
  } else {
    res.status(codes.BAD_REQUEST).json({ error: errors.INVALID_PAYLOAD });
  }
});

app.post("/user/signout", auth.authenticate, async (req, res) => {
  if (req && req.body) {
    res.status(codes.ACCEPTED).json(req.body);
  } else {
    res.status(codes.BAD_REQUEST).json({ error: errors.INVALID_PAYLOAD });
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
