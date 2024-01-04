const jwt = require("passport-jwt");
const { SECRET_KEY } = process.env;
const bcrypt = require("bcryptjs");
const { Users } = require("../../models/users");
const { HttpError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email }).exec();
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

  await Users.findByIdAndUpdate(user._id, { token });

  const responseData = {
    status: "OK",
    code: 200,
    data: {
      token,
      user: {
        email,
      },
    },
  };

  res.json(responseData);
};

module.exports = login;
