const { spotifyApi } = require("../../services/spotify");

module.exports = async function(parent, args, ctx, info) {
  if (!ctx.request.userId) return null;

  const { body } = await spotifyApi.getRecommendations({
    ...args
  });

  return body;
};
