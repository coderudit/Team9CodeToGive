// Author: Anuj Dev (B00900887)

const users = require("../models/users/users");
const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "HappyPlace",
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await users
        .findOne({
          id: payload.id,
        })
        .then(async (user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(null, false);
        });
    })
  );
};
