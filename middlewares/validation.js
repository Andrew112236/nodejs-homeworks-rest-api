const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers/httpErrorHandler");
const { Users } = require("../models/users");
const { SECRET_KEY } = process.env;

const validation = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      next(HttpError(401));
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await Users.findById(id);
      if (!user || !user.token || user.token !== token) {
        next(HttpError(401));
      }
      req.user = user;
      next();
    } catch (error) {
      throw HttpError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = validation;
