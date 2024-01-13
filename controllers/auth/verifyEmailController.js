const { verifyEmail } = require("./register");

const verifyEmailController = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    console.log(typeof verifyEmail);

    console.log(verificationToken);
    await verifyEmail(verificationToken);

    res.status(200).json({ mesaj: "Email verificat cu success", code: 200 });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = verifyEmailController;
