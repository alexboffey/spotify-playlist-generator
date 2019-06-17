const refresh = require("passport-oauth2-refresh");
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
  refresh.use(strategy);
  passport.serializeUser(serializeUser);
  passport.deserializeUser(serializeUser);
};
