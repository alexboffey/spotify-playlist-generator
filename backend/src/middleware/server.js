const jwt = require("jsonwebtoken");
const refresh = require("passport-oauth2-refresh");

const database = require("../services/database");
const { spotifyApi } = require("../services/spotify");
const { getMinutesUntilExpiration, getTimeExpires } = require("../lib/time");

/**
 * Decode JWT to put the userId on each request
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {void}
 */

exports.decodeJwt = (req, res, next) => {
  const { token } = req.cookies;

  console.log("middleware/server.decodeJwt", token);

  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;

    console.log("middleware/server.decodeJwt", userId);
  }

  next();
};

/**
 * Query user from DB and put relevant information on request
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {void}
 */

exports.populateUser = async (req, res, next) => {
  console.log("middleware/server.populateUser", req.userId);
  if (!req.userId) return next();

  const user = await database.query.user(
    { where: { id: req.userId } },
    "{ id, email, name, spotifyId, accessToken, refreshToken, time_expires }"
  );

  if (!spotifyApi.getAccessToken()) {
    spotifyApi.setAccessToken(user.accessToken);
  }

  // Put user on request obj
  req.user = user;

  next();
};

/**
 * Update access token if necessary
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {void}
 */

exports.updateAccessToken = async (req, res, next) => {
  console.log("middleware/server.updateAccessToken", req.userId);
  if (!req.userId) return next();

  // Update access token if necessary
  if (getMinutesUntilExpiration(req.user.time_expires) < 1) {
    const {accessToken, time_expires} = await refreshAccessToken(req.user.refreshToken);
    req.user.accessToken = accessToken;
    req.user.time_expires = time_expires
    spotifyApi.setAccessToken(accessToken);
  }

  next();
};

/**
 * @param {string} refreshToken
 * @return {Object}
 */

async function refreshAccessToken(refreshToken) {
  refresh.requestNewAccessToken(
    "spotify",
    refreshToken,
    async (err, accessToken) => {
      if (err) throw new Error(err);

      const time_expires = getTimeExpires();

      // Update user in db
      await database.mutation.updateUser({
        data: {
          accessToken,
          time_expires
        },
        where: { id: req.userId }
      });

      // Return new data
      return { accessToken, time_expires };
    }
  );
}
