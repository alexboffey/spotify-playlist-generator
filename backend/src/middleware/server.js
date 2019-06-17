const jwt = require("jsonwebtoken");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const database = require("../services/database");

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
      const { userId, accessToken, refreshToken, expires_in } = jwt.verify(
        token,
        process.env.APP_SECRET
      );
      // Put user id and other useful info on to request for subsequent requests to access
      req.userId = userId;
      req.accessToken = accessToken;
      req.refreshToken = refreshToken;
      req.expires_in = expires_in;
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
