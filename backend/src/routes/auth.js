const jwt = require("jsonwebtoken");

const database = require("../services/database");
const { getTimeExpires } = require("../lib/time");

/**
 * Perform necessary authentication steps
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {void}
 */

exports.authenticate = async (req, res, next) => {
  const {
    id: spotifyId,
    emails,
    displayName: name,
    accessToken,
    refreshToken
  } = req.user;

  const email = emails[0].value;
  const time_expires = getTimeExpires();

  const userExists = await database.query.user({ where: { email } });
  let user;

  if (!userExists) {
    user = await database.mutation.createUser({
      data: {
        spotifyId,
        email,
        name,
        accessToken,
        refreshToken,
        time_expires
      }
    });
  } else {
    user = userExists;
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  // Set cookie with token
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
  });

  next();
};

/**
 * Redirect user after login
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {void}
 */

exports.authCallback = (req, res) => {
  res.redirect("/");
};

/**
 * Log out user
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {void}
 */

exports.logout = (req, res) => {
  res.clearCookie("token");
  req.logout();
  res.redirect("/");
};
