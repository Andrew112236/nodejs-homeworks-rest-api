const passport = require("passport");

const customAuthMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Access Denied",
        data: "Unauthorized",
      });
    }
    req.authenticatedUser = user;
    next();
  })(req, res, next);
};

module.exports = { customAuthMiddleware };
