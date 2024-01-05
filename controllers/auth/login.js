const jwt = require("passport-jwt");
const { SECRET } = process.env;
const bcrypt = require("bcryptjs");
const { Users } = require("../../models/users");
const {
  createSuccessResponse,
  handleLoginErrors,
} = require("../../helpers/handleErrors");

const login = async (req, res) => {
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

  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

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
};

module.exports = login;
