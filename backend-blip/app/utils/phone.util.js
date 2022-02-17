const errors = require("../utils/errors.util.js");
const twilioClient = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const apiBase =
  process.env.NODE_ENV === "production"
    ? `https://project-blip.herokuapp.com`
    : `http://localhost:8080`;

exports.generateVerifyPhoneLinkUser = async (token, user) => {
  try {
    const link = `${apiBase}/user/verify-phone?token=${token}`;
    const status = await twilioClient.messages.create({
      body: `Hi ${user.username}, Your Verify Phone Link for ${user.phone} is ${link}. This is a one time use link and will expire in 30mins. -- Project BLiP`,
      from: process.env.TWILIO_PHONE,
      to: `+91${user.phone}`,
    });
    return status;
  } catch (error) {
    console.log(error);
    throw errors.MESSAGE_SENDING_FAILED;
  }
};
