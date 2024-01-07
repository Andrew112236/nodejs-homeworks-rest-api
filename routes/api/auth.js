const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/index");
const multer = require("multer");
const path = require("path");

const { customAuthMiddleware } = require("../../middlewares/authToken");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/avatars/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/signup", authController.register);

router.post("/login", authController.login);

router.get("/logout", customAuthMiddleware, authController.logout);

router.get("/current", customAuthMiddleware, authController.currentValidation);

router.patch(
  "/avatars",
  customAuthMiddleware,
  upload.single("avatar"),
  authController.updateAvatar
);

module.exports = router;
