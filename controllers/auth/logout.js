const Users = require("../../models/users");

const logout = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await Users.findById(_id);
    if (!user.token) {
      return res.status(200).json({ message: "User already logged out!" });
    }

    await Users.findByIdAndUpdate(_id, { token: null });

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error updating user token:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = logout;
