const express = require("express");
const controller = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");
const { verificationBody, validation } = require("../../middlewares");
const { registerSchema, loginSchema } = require("../../schema/users");

const router = express.Router();

router.post(
  "/signup",
  verificationBody(registerSchema),
  controllerWrapper(controller.register)
);

router.post(
  "/login",
  verificationBody(loginSchema),
  controllerWrapper(controller.login)
);

router.get(
  "/current",
  validation,
  controllerWrapper(controller.currentValidation)
);

router.post("/logout", validation, controllerWrapper(controller.logout));

module.exports = router;
