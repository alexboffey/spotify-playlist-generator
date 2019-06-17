const { strategy } = require("../services/spotify");

function serializeUser(user, done) {
  return done(null, user);
}

/**
 * @param {Object} passport
 * @returns {void}
 */

module.exports = passport => {
  passport.use(strategy);
  passport.serializeUser(serializeUser);
  passport.deserializeUser(serializeUser);
};
