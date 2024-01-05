const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/index");

const { customAuthMiddleware } = require("../../middlewares/authToken");

router.post("/signup", authController.register);

router.post("/login", authController.login);

router.get("/logout", customAuthMiddleware, authController.logout);

router.get("/current", customAuthMiddleware, authController.currentValidation);

module.exports = router;
