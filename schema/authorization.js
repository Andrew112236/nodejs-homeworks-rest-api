const { promisify } = require("util");
const Joi = require("joi");

const validateAsync = promisify(Joi.object().validateAsync.bind(Joi.object()));

// add Contact Authorization

const addContactAuthorization = async (req, res, next) => {
  try {
    const addContactSchema = Joi.object({
      name: Joi.string().min(3).max(30).alphanum().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "ro"] } })
        .required(),
      phone: Joi.string().min(9).required(),
    });

    await validateAsync(req.body, addContactSchema);

    next();
  } catch (error) {
    return res.status(400).json({ code: 400, message: error.message });
  }
};

// Put Contact Authorization

const putContactAuthorization = async (req, res, next) => {
  try {
    const putContactSchema = Joi.object({
      name: Joi.string().min(3).max(30).alphanum().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "ro"] } })
        .required(),
      phone: Joi.string().min(9).required(),
    });

    await validateAsync(req.body, putContactSchema);

    next();
  } catch (error) {
    return res.status(400).json({ code: 400, message: "Bad Request" });
  }
};

// Favorite Contact Authorization

const updateContactAuthorization = async (req, res, next) => {
  try {
    const updateContactSchema = Joi.object({
      favorite: Joi.boolean().required(),
    });

    await validateAsync(req.body, updateContactSchema);

    next();
  } catch (error) {
    return res.status(400).json({ code: 400, message: error.message });
  }
};

module.exports = {
  addContactAuthorization,
  putContactAuthorization,
  updateContactAuthorization,
};
