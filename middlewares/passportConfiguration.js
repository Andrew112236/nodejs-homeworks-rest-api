const passport = require("passport");
const passportJWT = require("passport-jwt");
const Users = require("../schema/users");

require("dotenv").config();
const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const jwtOptions = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

const verifyUser = async (payload, done) => {
  try {
    console.log("Payload:", payload);
    const user = await Users.findById(payload.id);

    if (!user) {
      return done(new Error("User not found!"));
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

// JWT Strategy
passport.use(new Strategy(jwtOptions, verifyUser));

module.exports = passport;
