const Joi = require("joi");

// add Contact Authorization

const addContactAuthorization = async (req, res, next) => {
  try {
    const addContactSchema = Joi.object({
      name: Joi.string()
        .regex(/^[a-zA-Z ]+$/)
        .min(3)
        .max(30)
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "ro"] } })
        .required(),
      phone: Joi.string().min(9).required(),
    }).options({ allowUnknown: true });

    await addContactSchema.validateAsync(req.body);

    console.log(addContactSchema);

    next();
  } catch (error) {
    return res.status(400).json({ code: 400, message: error.message });
  }
};

// Put Contact Authorization

const putContactAuthorization = async (req, res, next) => {
  try {
    const putContactSchema = Joi.object({
      name: Joi.string()
        .regex(/^[a-zA-Z ]+$/)
        .min(3)
        .max(30)
        .optional(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "ro"] } })
        .optional(),
      phone: Joi.string().min(9).optional(),
    }).min(1);

    await putContactSchema.validateAsync(req.body);

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

    await updateContactSchema.validateAsync(req.body);

    next();
  } catch (error) {
    return res.status(400).json({ code: 400, message: "Sunt aici" });
  }
};

module.exports = {
  addContactAuthorization,
  putContactAuthorization,
  updateContactAuthorization,
};
