const { Strategy } = require("passport-spotify");
const SpotifyWebApi = require("spotify-web-api-node");

exports.strategy = new Strategy(
  {
    clientID: process.env.SPOTIFY_CLIENT,
    clientSecret: process.env.SPOTIFY_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL,
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, expires_in, profile, done) => {
    process.nextTick(() => {
      done(
        null,
        Object.assign({}, profile, { accessToken, refreshToken, expires_in })
      );
    });
  }
);

exports.spotifyApi = new SpotifyWebApi({
  clientID: process.env.SPOTIFY_CLIENT,
  clientSecret: process.env.SPOTIFY_SECRET
});