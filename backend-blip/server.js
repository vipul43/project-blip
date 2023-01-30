// importing modules
// top level imports
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// db imports
const db = require("./app/models");
const mongodb = require("./app/utils/mongodb.util.js");

// controller imports
const userController = require("./app/controllers/user.controller.js");
const partnerController = require("./app/controllers/partner.controller.js");
const adminController = require("./app/controllers/admin.controller.js");
const statsController = require("./app/controllers/stats.controller.js");
// const blogController = require("./app/controllers/blog.controller.js");
const faqController = require("./app/controllers/faq.controller.js");

// low level imports
const auth = require("./app/middlewares/auth.middleware.js");
const cron = require("node-cron");
const rateLimit = require("express-rate-limit");

// setting up express app
const app = express();
var corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [
          "http://project-blip.onrender.com",
          "https://project-blip.onrender.com",
        ]
      : "http://localhost:8080",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// connecting to mongodb database
mongodb.connect(db);

/*************************** Base APIs ***************************/
// Sending reponse HTML
app.get("/", async (req, res) => {
  res.sendFile("/public/response.html", { root: __dirname });
});

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

// Authenticating user, deleting user from the database
app.post("/user/delete", auth.authenticate, async (req, res) => {
  await userController.handleUserDeletion(req, res);
});

app.post("/user/gen-reset-password-link", async (req, res) => {
  await userController.handleUserGenerateResetPasswordLink(req, res);
});

app.post("/user/reset-password", auth.authenticate, async (req, res) => {
  await userController.handleUserResetPassword(req, res);
});

app.post("/user/gen-verify-email-link", async (req, res) => {
  await userController.handleUserGenerateVerifyEmailLink(req, res);
});

app.post("/user/verify-email", auth.authenticate, async (req, res) => {
  await userController.handleUserVerifyEmail(req, res);
});

// Add new donation to user by adding assiging the donation to user
app.post(
  "/user/donation-details/:userId",
  auth.authenticate,
  async (req, res) => {
    await userController.handleUserDonation(req, res, null);
  }
);

// Get all user associated donations(unarchived only)
app.get(
  "/user/donation-details/:userId",
  auth.authenticate,
  async (req, res) => {
    await userController.handleUserDonation(req, res);
  }
);

// Update archived status and issues of a donation
app.put(
  "/user/donation-details/:userId/update/:donationId",
  auth.authenticate,
  async (req, res) => {
    await userController.handleUserDonation(req, res);
  }
);

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

app.post("/partner/gen-reset-password-link", async (req, res) => {
  await partnerController.handlePartnerGenerateResetPasswordLink(req, res);
});

app.post("/partner/reset-password", auth.authenticate, async (req, res) => {
  await partnerController.handlePartnerResetPassword(req, res);
});

app.post(
  "/partner/donation-details/:partnerId",
  auth.authenticate,
  async (req, res) => {
    await partnerController.handlePartnerDonation(req, res);
  }
);

app.get(
  "/partner/donation-details/:partnerId",
  auth.authenticate,
  async (req, res) => {
    await partnerController.handlePartnerDonation(req, res);
  }
);

// Update archived status and issues of a donation
app.put(
  "/partner/donation-details/:partnerId/update/:donationId",
  auth.authenticate,
  async (req, res) => {
    await partnerController.handlePartnerDonation(req, res);
  }
);

/*************************** Admin Crons ***************************/
cron.schedule("30 2 * * *", async () => {
  console.log("Initiating Removal of Expired Tokens.");
  await adminController.handleExpiredTokens();
  console.log("Ending Removal of Expired Tokens.");
});

/*************************** Admin APIs ***************************/
// Siging in Admin user by validating Admin user credentials in database,
// generating jwt token to send as payload
app.post("/admin/signin", async (req, res) => {
  await adminController.handleAdminValidation(req, res);
});

// Authenticating Admin user and resending the payload
app.post("/admin/auth", auth.authenticate, async (req, res) => {
  await adminController.handleAdminAuthentication(req, res);
});

// Authenticating Admin user, signing out Admin user and
//blacklisting the token to avoid further login with same token
app.post("/admin/signout", auth.authenticate, async (req, res) => {
  await adminController.handleAdminInvalidation(req, res);
});

app.get("/admin/users", auth.authenticate, async (req, res) => {
  await adminController.handleAdminFetchUsers(req, res);
});

/*************************** Stats APIs ***************************/
app.get("/stats/active-users-count", async (req, res) => {
  await statsController.handleActiveUserCount(req, res);
});

app.get("/stats/active-partners-count", async (req, res) => {
  await statsController.handleActivePartnerCount(req, res);
});

app.get("/stats/donations-count", async (req, res) => {
  await statsController.handleDonationCount(req, res);
});

/*************************** Blogs APIs ***************************/
// TODO: LATER
// app.get("/blogs", async (req, res) => {
//   await blogController.handleBlogFetchAll(req, res);
// });

// app.get("/blogs/:blogId", async (req, res) => {
//   await blogController.handleBlogFetch(req, res);
// });

/*************************** FAQ APIs ***************************/
app.get("/faqs", async (req, res) => {
  await faqController.handleFAQFetchAll(req, res);
});

// listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
