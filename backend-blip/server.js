// importing modules
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const mongodb = require("./app/utils/mongodb.util.js");
const userController = require("./app/controllers/user.controller.js");
const partnerController = require("./app/controllers/partner.controller.js");
const adminController = require("./app/controllers/admin.controller.js");
const auth = require("./app/middlewares/auth.middleware.js");
const cron = require("node-cron");

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

// Authenticating user, updating using details in the database
app.post("/user/update", auth.authenticate, async (req, res) => {
  await userController.handleUserUpdation(req, res);
});

/*************************** Partner APIs ***************************/
// Signing up user by creating entry in database,
//generating jwt token to send as payload
app.post("/partner/signup", async (req, res) => {
  await partnerController.handlePartnerCreation(req, res);
});

// Siging in user by validating user credentials in database,
// generating jwt token to send as payload
app.post("/partner/signin", async (req, res) => {
  await partnerController.handlePartnerValidation(req, res);
});

// Authenticating user and resending the payload
app.post("/partner/auth", auth.authenticate, async (req, res) => {
  await partnerController.handlePartnerAuthentication(req, res);
});

// Authenticating user, signing out user and
//blacklisting the token to avoid further login with same token
app.post("/partner/signout", auth.authenticate, async (req, res) => {
  await partnerController.handlePartnerInvalidation(req, res);
});

/*************************** Admin Crons ***************************/
cron.schedule("30 2 * * *", async () => {
  console.log("Initiating Removal of Expired Tokens.");
  await adminController.handleExpiredTokens();
  console.log("Ending Removal of Expired Tokens.");
});

// listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
