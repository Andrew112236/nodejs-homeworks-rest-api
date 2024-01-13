const { register, verifyEmail } = require("./register");

const login = require("./login");

const logout = require("./logout");

const currentValidation = require("./currentValidation");

const updateAvatar = require("./updateAvatar");

const verifyEmailController = require("./verifyEmailController");

const resendEmailVerification = require("./resendEmailVerification");

module.exports = {
  register,
  login,
  logout,
  currentValidation,
  updateAvatar,
  verifyEmailController,
  verifyEmail,
  resendEmailVerification,
};
