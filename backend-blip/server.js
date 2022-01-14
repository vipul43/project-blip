// importing modules
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const db = require("./app/models");
const mongodb = require("./app/utils/mongodb.util.js");
const userController = require("./app/controllers/user.controller.js");
const partnerController = require("./app/controllers/partner.controller.js");
const errors = require("./app/utils/errors.util.js");
const codes = require("./app/utils/codes.util.js");
const auth = require("./app/middlewares/auth.middleware.js");

// setting up express app
const app = express();
var corsOptions = {
  origin: "http://localhost:8080",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connecting to mongodb database
mongodb.connect(db);

/*************************** User APIs ***************************/
// Signing up user by creating entry in database,
//generating jwt token to send as payload
app.post("/user/signup", async (req, res) => {
  await userController.handleUserCreation(req, res);
});

// Siging in user by validating user credentials in database,
// generating jwt token to send as payload
app.post("/user/signin", async (req, res) => {
  await userController.handleUserValidation(req, res);
});

// Authenticating user and resending the payload
app.post("/user/auth", auth.authenticate, async (req, res) => {
  await userController.handleUserAuthentication(req, res);
});

// Authenticating user, signing out user and
//blacklisting the token to avoid further login with same token
app.post("/user/signout", auth.authenticate, async (req, res) => {
  await userController.handleUserInvalidation(req, res);
});

/*************************** Partner APIs ***************************/

// listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
