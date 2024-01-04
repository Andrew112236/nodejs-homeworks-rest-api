const express = require("express");

const controller = require("../../controllers/contacts");

const { controllerWrapper } = require("../../helpers/controllerWrapper");

const { validateIdParam } = require("../../middlewares/isValid");
const { validation } = require("../../middlewares/validation");
const { verificationBody } = require("../../middlewares/bodyVerification");

const {
  addContactAuthorization,
  updateContactAuthorization,
  putContactAuthorization,
} = require("../../schema/authorization");

const router = express.Router();

router.get("/", validation, controllerWrapper(controller.listContacts));

router.post(
  "/",
  validation,
  verificationBody(addContactAuthorization, "missing required fields"),
  controllerWrapper(controller.addContact)
);

router.get(
  "/:contactId",
  validation,
  validateIdParam,
  controllerWrapper(controller.getContactById)
);

router.put(
  "/:contactId",
  validation,
  validateIdParam,
  verificationBody(putContactAuthorization),
  controllerWrapper(controller.updateContactById)
);

router.delete(
  "/:contactId",
  validation,
  validateIdParam,
  controllerWrapper(controller.removeContactById)
);

router.patch(
  "/:contactId/favorite",
  validation,
  validateIdParam,
  verificationBody(updateContactAuthorization),
  controllerWrapper(controller.updateFavorite)
);

module.exports = router;
