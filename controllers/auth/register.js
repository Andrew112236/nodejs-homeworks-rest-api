const jwt = require("jsonwebtoken");
const { createSuccessResponse } = require("../../helpers/handleErrors");
const Users = require("../../models/users");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    const existingUser = await Users.findOne({ email }).exec();
    console.log(existingUser);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const newUser = await Users.create({ email, password });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    console.log(newUser);
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
