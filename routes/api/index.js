const express = require("express");
const router = express.Router();
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  res
    .status(200)
    .json({ status: "succes", code: 200, data: "Serverul functioneaza!" });
  next();
});

router.get("/contacts", async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json({
      status: "success",
      code: 200,
      data: { ...contacts },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Eroare in listarea contactelor!",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    res.status(200).json({
      status: "success",
      code: 200,
      data: { ...contact },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Nu s-a gasit!",
    });
  }
});

router.delete("/contacts/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    await removeContact(contactId);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contactul a fost sters!",
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Nu a fost gasit!",
    });
  }
});

// JOI package

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.post("/contacts", async (req, res, next) => {
  try {
    await addContactSchema.validateAsync(req.body);
    const { name, email, phone } = req.body;
    const data = await addContact({ name, email, phone });
    res.status(201).json({
      status: "success",
      code: 201,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "lipseste date",
    });
  }
});

const schemaUpdate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
}).min(1);

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Lipseste informatia ceruta!",
    });
  }
  try {
    await schemaUpdate.validateAsync(req.body);
    const data = await updateContact(contactId, { name, email, phone });
    res.status(200).json({
      status: "success",
      code: 200,
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Nu s-a gasit!",
    });
  }
});

module.exports = router;
