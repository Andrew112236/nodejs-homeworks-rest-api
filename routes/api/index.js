const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contacts");

const { customAuthMiddleware } = require("../../middlewares/authToken");

router.get("/", customAuthMiddleware, controller.listContacts);

router.post("/", customAuthMiddleware, controller.addContact);

router.get("/:contactId", customAuthMiddleware, controller.getContactById);

router.delete(
  "/:contactId",
  customAuthMiddleware,
  controller.removeContactById
);

router.put("/:contactId", customAuthMiddleware, controller.updateContactById);

router.patch(
  "/:contactId/favorite",
  customAuthMiddleware,
  controller.updateFavorite
);

module.exports = router;
