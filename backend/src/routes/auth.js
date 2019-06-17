const passport = require("passport");
const jwt = require("jsonwebtoken");
const database = require("../services/database");

// Define spotify authorization scope
const scope = ["user-read-email", "user-read-private"];

/**
 * @param {Object} server
 * @returns {void}
 */

module.exports = server => {
  // Authenticate route
  server.express.use(
    "/auth/spotify",
    passport.authenticate("spotify", { scope, showDialog: true }),
    async (req, res, next) => {
      const {
        id: spotifyId,
        emails,
        displayName: name,
        accessToken,
        refreshToken,
        expires_in
      } = req.user;

      const email = emails[0].value;

      const userExists = await database.query.user({ where: { email } });
      let user;

      if (!userExists) {
        user = await database.mutation.createUser({
          data: {
            spotifyId,
            email,
            name
          }
        });
      } else {
        user = userExists;
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, accessToken, refreshToken, expires_in },
        process.env.APP_SECRET
      );

      // Set cookie with token
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: expires_in * 1000 // 1hr
      });

      next();
    }
  );

  // Callback
  server.express.use("/auth/spotify/callback", (req, res) => {
    res.redirect("/");
  });

  // Logout
  server.express.use("/auth/logout", (req, res) => {
    res.clearCookie("token");
    req.logout();
    res.redirect("/");
  });
};
