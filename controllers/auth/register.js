const bcrypt = require("bcryptjs");
const { HttpError } = require("../../helpers");
const { Users } = require("../../models/user");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Users.findOne({ email }).exec();
    if (existingUser) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({ email, password: hashPassword });

    res.status(201).json({
      user: {
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      code: error.statusCode || 500,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = register;
