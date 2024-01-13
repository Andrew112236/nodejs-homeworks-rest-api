const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const usersSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    minLength: 2,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: Object,
    required: [true, "Verify token is required"],
  },
});

usersSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

usersSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw new Error("Incorrect password");
    }
  } else {
    throw new Error("Incorrect email");
  }
};

usersSchema.statics.verifyEmail = async function (verificationToken) {
  try {
    const user = await this.findOne({ verificationToken });
    if (!user) {
      throw new Error("User not found for this verification code");
    }

    user.verificationToken = null;
    await user.save();

    return user.toJSON;
  } catch (error) {
    throw new Error("Error in email validation: " + error.message);
  }
};

usersSchema.pre("save", function (next) {
  if (!this.avatarURL) {
    this.avatarURL = gravatar.url(
      this.email,
      { s: "250", r: "pg", d: "identicon" },
      true
    );
  }

  next();
});

const Users = mongoose.model("users", usersSchema);

module.exports = Users;
