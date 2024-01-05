const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const { createSuccessResponse } = require("../../helpers/handleErrors");
const { Users } = require("../../models/users");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Users.findOne({ email }).exec();
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 25);
    const token = jwt.sign({ id: existingUser._id }, SECRET, {
      expiresIn: "1h",
    });

    const newUser = await Users.create({ email, password: hashedPassword });
    const response = createSuccessResponse(newUser, token);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = register;
