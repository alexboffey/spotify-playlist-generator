const { spotifyApi } = require("../../services/spotify");

module.exports = async function(parent, args, ctx, info) {
  if (!ctx.request.userId) return null;

  const { body } = await spotifyApi.search(
    args.query.toLowerCase(),
    [args.type],
    {
      limit: args.limit
    }
  );

  return body;
};
