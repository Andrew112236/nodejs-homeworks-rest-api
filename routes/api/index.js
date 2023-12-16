const express = require("express");

const controller = require("../../controllers/contacts");

const {
  addContactAuthorization,
  putContactAuthorization,
  updateContactAuthorization,
} = require("../../schema/authorization");

const { controlWrapper, validateIdParam } = require("../../helpers");

const router = express.Router();

router.get("/", controlWrapper(controller.listContacts));

router.post(
  "/",
  addContactAuthorization,
  controlWrapper(controller.addContact)
);

router.get(
  "/:contactId",
  validateIdParam,
  controlWrapper(controller.getContactById)
);

router.put(
  "/:contactId",
  putContactAuthorization,
  validateIdParam,
  controlWrapper(controller.updateContactById)
);

router.delete(
  "/:contactId",
  validateIdParam,
  controlWrapper(controller.removeContactById)
);

router.patch(
  "/:contactId/favorite",
  updateContactAuthorization,
  validateIdParam,
  controlWrapper(controller.updateFavorite)
);

module.exports = router;
