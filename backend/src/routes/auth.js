const passport = require("passport");
const jwt = require("jsonwebtoken");
const database = require("../services/database");

// Define spotify authorization scope
const scope = [
  "user-read-email",
  "user-read-private",
  "user-library-modify",
  "user-library-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-read-recently-played",
  "user-top-read"
];

const getTimeExpires = (expires_in = 3600) => {
  let timeExpires = new Date();
  // give ourselves a little breathing room before it actually expires
  timeExpires.setSeconds(timeExpires.getSeconds() + expires_in * 0.9);

  return timeExpires;
};

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
      const time_expires = getTimeExpires(expires_in);

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
        { userId: user.id, accessToken, refreshToken, time_expires },
        process.env.APP_SECRET
      );

      // Set cookie with token
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
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
