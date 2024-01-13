const jwt = require("jsonwebtoken");
const { createSuccessResponse } = require("../../helpers/handleErrors");
const Users = require("../../models/users");
const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    const existingUser = await Users.findOne({ email }).exec();
    console.log(existingUser);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const uniqueCodeVerification = uuidv4();

    const msg = {
      to: email,
      from: "andrew83442@outlook.com",
      subject: "Email de Verificare Cont",
      html: `<a href="https:localhost:3001/api/users/verify/${uniqueCodeVerification}">Confirm`,
    };

    sgMail
      .send(msg)
      .then(() => console.log("Email trimis"))
      .catch(() => {
        throw new Error("Erroare la trimitere.");
      });

    const newUser = await Users.create({
      email,
      password,
      verificationToken: uniqueCodeVerification,
    });

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

// VerifyEmail function

const verifyEmail = async (verificationToken) => {
  const update = { verify: true, verificationToken: null };

  const result = await Users.findOneAndUpdate(
    {
      verificationToken,
    },
    { $set: update },
    { new: true }
  );
  console.log(result);
  if (!result) throw new Error("userul nu exista");
};

console.log("Register type:", Object.prototype.toString.call(register));
console.log("VerifyEmail type:", Object.prototype.toString.call(verifyEmail));

console.log(typeof register);
console.log(typeof verifyEmail);

module.exports = { register, verifyEmail };
