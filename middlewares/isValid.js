const { isValidObjectId } = require("mongoose");

const validateIdParam = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return res
      .status(404)
      .json({ message: `${contactId} is not a valid ObjectId` });
  }

  next();
};

module.exports = validateIdParam;
