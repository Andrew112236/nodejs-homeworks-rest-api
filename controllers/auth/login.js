const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../../models/users");
const {
  createSuccessResponse,
  handleLoginErrors,
} = require("../../helpers/handleErrors");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.login(email, password);
    if (!user) {
      throw handleLoginErrors();
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      throw handleLoginErrors();
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });

    await Users.findByIdAndUpdate(user._id, { token });
    const response = createSuccessResponse(user, token);

    const responseData = {
      status: "OK",
      code: 200,
      data: {
        token,
        user: {
          email: response.user.email,
        },
      },
    };

    res.json(responseData);
  } catch (error) {
    console.error(`Error during login: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = login;
