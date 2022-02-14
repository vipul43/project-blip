var nodemailer = require("nodemailer");
const errors = require("../utils/errors.util.js");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.OFFL_GMAIL_ID,
    pass: process.env.APP_PASSWORD_OFFL_GMAIL,
  },
});

exports.generateResetPasswordLinkUser = async (token, user) => {
  try {
    const link = `http://localhost:8080/user/reset-password?token=${token}`;
    const status = await transporter.sendMail({
      from: `"Project BLiP" <${process.env.OFFL_GMAIL_ID}>`,
      to: user.email,
      subject: `Reset Password`,
      html: `<p>Hi ${user.username},<br>Your Reset Password Link is <a href="${link}">here</a>.<br>The link will expire in 30mins.<br><br></p><p>Project BLiP</p>`,
    });
    return status;
  } catch (error) {
    console.log(error);
    throw errors.MAIL_SENDING_FAILED;
  }
};

exports.generateResetPasswordLinkPartner = async (token, user) => {
  try {
    const link = `http://localhost:8080/partner/reset-password?token=${token}`;
    const status = await transporter.sendMail({
      from: `"Project BLiP" <${process.env.OFFL_GMAIL_ID}>`,
      to: user.email,
      subject: `Reset Password`,
      html: `<p>Hi ${user.username},<br>Your Reset Password Link is <a href="${link}">here</a>.<br>The link will expire in 30mins.<br><br></p><p>Project BLiP</p>`,
    });
    return status;
  } catch (error) {
    console.log(error);
    throw errors.MAIL_SENDING_FAILED;
  }
};
