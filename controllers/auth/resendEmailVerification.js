const Users = require("../../models/users");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendEmail = async (data) => {
  const mail = { ...data, from: process.env.SENDGRID_SENDER };
  await sgMail.send(mail);
  return true;
};
const resendEmailVerification = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    throw new Error("Missing required field in your email!");
  }
  if (user.verify) {
    throw new Error("Verification has already been passed!");
  }
  const mail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm your email</a>`,
  };
  await sendEmail(mail);
  res.json({
    status: "OK",
    code: 200,
    ResponseBody: {
      message: "Verification email resend",
    },
  });
};
module.exports = resendEmailVerification;
