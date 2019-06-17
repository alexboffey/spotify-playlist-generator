const jwt = require("jsonwebtoken");
const passport = require("passport");
const refresh = require("passport-oauth2-refresh");
const cookieParser = require("cookie-parser");
const database = require("../services/database");

const getMinutesUntilExpiration = timeExpires => {
  const diff = new Date(timeExpires) - new Date();
  return Math.floor(diff / 1000 / 60);
};

/**
 * @param {Object} server
 * @return {void}
 */

module.exports = server => {
  server.express.use(cookieParser());

  // Initialise passport
  server.express.use(passport.initialize());

  // Decode JWT so we can get userId on each request
  server.express.use((req, res, next) => {
    // Get token from request
    const { token } = req.cookies;

    if (token) {
      const { userId, accessToken, refreshToken, time_expires } = jwt.verify(
        token,
        process.env.APP_SECRET
      );
      // Put user id and other useful info on to request for subsequent requests to access
      req.userId = userId;
      req.accessToken = accessToken;
      req.refreshToken = refreshToken;

      // Refresh access token here if necessary
      if (getMinutesUntilExpiration(time_expires) < 0) {
        // MAKE SURE THIS WORKS LOL
        refresh.requestNewAccessToken(
          "spotify",
          refreshToken,
          (err, accessToken, refreshToken) => {
            if (err) throw new Error(err);

            req.accessToken = accessToken;
            req.refreshToken = refreshToken;
          }
        );
      }
    }

    next();
  });

  // Middleware to populate the user on each request
  server.express.use(async (req, res, next) => {
    if (!req.userId) return next();

    const user = await database.query.user(
      { where: { id: req.userId } },
      "{ id, email, name, spotifyId }"
    );

    req.user = user;
    next();
  });
};
